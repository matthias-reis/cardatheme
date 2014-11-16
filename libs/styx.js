/**
 * Console Log Fix
 */
if (typeof window.console === "undefined" && typeof window.console.log === "undefined") {
    window.console = function () {
    };
    window.console.log = function () {
    };
}

/**
 * Styx-JS-Library
 *
 * @author matthias.reis@weltbild.com (Matthias Reis, mre)
 *
 * @version 1.0
 */
(function (global, $) {
    /**
     * global namespace as single global variable
     */
    var sx = global.sx = {};


    /**
     * create a new namespace
     * example:
     * <code>
     *     sx.nsp('de.smartr.test');
     *     de.smartr.test.testVar = true;
     * </code>
     *
     *  @param name string the namespace to be created - subnamespaces may be separated by a "."
     *  @return namespace object
     */
    sx.nsp = function (name) {
        var ns = name.split('.');
        var o = global;
        var i;
        for (i = 0; i < ns.length; i++) {
            o = o[ns[i]] = o[ns[i]] || {};
        }
        return o;
    };

    /**
     * debug mode
     * assign class 'debug' to your html body to activate debug mode
     */
    sx.isDebug = function () {
        //noinspection JSUnresolvedFunction
        return $('body').is('.debug');
    };


    /*** LOGGING ***/

    sx.logging = {
        /**
         * contains all log messages
         */
        _logstack: [],

        _log: function (type, content) {
            var hasConsole = sx.isDebug() &&
                (typeof console != "undefined") &&
                (typeof console[type] != "undefined") &&
                (typeof console[type].apply != "undefined");

            for (var i = 0; i < content.length; i++) {
                this._logstack.push(type + ': ' + content[i]);
            }

            if (hasConsole) {
                if (content.length == 1 && $.isArray(content[0])) {
                    content = content[0];
                }
                console[type].apply(console, content);
            }
        },

        getLogstack: function () {
            var ret = '';
            for (var i = 0; i < this._logstack.length; i++) {
                ret += this._logstack[i].toString() + '<br />';
            }
            return ret;
        },

        resetLogstack: function () {
            this.logstack = [];
        },

        log: function () {
            this._log('log', arguments);
        },

        info: function () {
            this._log('info', arguments);
        },

        warn: function () {
            this._log('warn', arguments);
        },

        error: function () {
            this._log('error', arguments);
        }
    };


    /**
     * Wirft eine Exception, die per try/catch behandelt werden kann
     * @param exceptionName Name
     * @param message Nachricht, Beschreibung
     */
    sx.exception = function (exceptionName, message) {
        var hasConsole = (typeof console != "undefined") && (typeof console.trace != "undefined");
        if (sx.isDebug() && hasConsole) {
            console.trace();
        }
        throw exceptionName + ': ' + message;
    };


    /*** HELPERS AND UTILS ***/

    /**
     * "each" implementation for arrays
     */
    Array.prototype.each = function (fn) {
        if (!fn) {
            return;
        }

        for (var i = 0; i < this.length; i++) {
            fn.call(this[i], i, this[i]);
        }
    };

    sx.emptyEl = function () {
        return $('<span></span>');
    };

    sx.emptyFn = function () {
        return function () {
        };
    };

    sx.utils = {
        getBaseUrl: function () {
            var loc = global.location.href,
                markerPos = loc.indexOf('?');

            if (markerPos > 0) {
                return loc.substring(0, markerPos);
            }

            return loc;
        },

        formatPrice: function (price) {
            var ext = " EUR";
            if (typeof price === 'number') {
                price = price / 100;
                price = price.toFixed(2);
            }
            price = '' + price;

            var bodyEl = $('body');
            if (bodyEl.hasClass('ch')) {
                ext = "Fr. ";
                return ext + price;
            }

            return price + ext;
        },

        getPrice: function (priceObject) {
            if (priceObject.value != undefined && priceObject.currency != undefined) {
                var price = priceObject.value.toFixed(2);

                if (priceObject.currency === 'EUR') {
                    return price + ' ' + '€';
                }

                if (priceObject.currency === 'CHF') {
                    return 'Fr.' + ' ' + price;
                }

                return price + ' ' + priceObject.currency;
            }

            return null;
        },

        getCanonicalUrl: function (url) {
            var ret = '';

            if (url.charAt(0) == '/') {
                ret = global.location.protocol + '//' + global.location.host + url;
            } else if (url.charAt(0) == '?') {
                ret = global.location.protocol + '//' + global.location.host + '/index.html' + url;
            } else {
                ret = url;
                ret = ret.replace(/http:/g, 'https:');
            }

            return ret;
        },
        getParam: function (param) {
            var params = [];
            if (location.href.split('?').length > 1) {
                var get = location.href.split('?')[1];
                var parts = get.split('&');
                for (var i = 0; i < parts.length; i++) {
                    var part = parts[i].split('=');
                    params[part[0]] = part[1];
                }
            }

            return (typeof params[param] == 'undefined') ? '' : params[param];
        },

        delay: function (id, cb, t) {
            sx.utils._globalCallback = sx.utils._globalCallback || [];
            sx.utils._globalCallback[id] = cb;
            var callbackString = 'sx.utils._continueAfterDelay("' + id + '")';
            global.setTimeout(callbackString, t);
        },

        stopDelay: function (id, cb) {
            if (sx.globalTimeout !== undefined) {
                window.clearTimeout(sx.globalTimeout[id]);
            }
            if (cb != undefined) {
                cb();
            }
        },

        _continueAfterDelay: function (id) {
            sx.utils._globalCallback[id]();
        },

        isFunction: function (value) {
            return typeof value === 'function';
        },

        getUniqueId: function () {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        },

        cookie: {
            set: function (key, value, expiresInMillis, path) {
                path = path || '/';
                var cookieString = key + '=' + value + '; ';
                if (expiresInMillis) {
                    var t = new Date();
                    t.setTime(t.getTime() + expiresInMillis);
                    cookieString += 'expires=' + t.toGMTString() + '; ';
                }
                cookieString += 'path=' + path;
                document.cookie = cookieString;
            },
            get: function (key) {
                var cookies = { };
                if (document.cookie) {
                    var split = document.cookie.split(';');
                    for (var i = 0; i < split.length; i++) {
                        var name = split[i].split("=", 1);
                        var value = split[i].substr(split[i].indexOf("=") + 1);
                        name[0] = name[0].replace(/^ /, '');
                        cookies[decodeURIComponent(name[0])] = decodeURIComponent(value);
                    }
                }

                return cookies[key] || false;
            }
        }
    };


    /**
     * styx.js Class Factory
     * creates an object oriented facade for javascript by creating classes from a configuration object
     *
     * @param o configuration object with the following keys
     *
     * nsp: target namespace in which the object will reside - if it doesnt exist, it will be provided - defaults to 'sx'
     * name: name of the prototype object/the class - create an instance by calling var object = new <nsp>.<name>
     * parent: parent class name/prototype object name - children inherit all functions and class variables
     * cfg: key/value store for config values - can be accessed via this.cfg.<key> - children inherit config values from their parents
     * m: methods of the class - 'construct' is the constructor-method called at instatiation time
     * traits: a trait is a collection of functions and properties who are mixed into the prototype object (mixin pattern)
     * isSingleton: true/false, if true a method 'getInstance' is created and the instance is handled within the class - called by <nsp>.<name>.getInstance()
     */
    sx.build = function (o) {

        if (!o.name) {
            sx.exception('StyxJsClassDefException', 'please define a name for the class');
        }

        if (!o.nsp) {
            o.nsp = 'sx';
        }

        var i, func;

        //inheritance
        var F = function () {
        };

        if (o.parent) {
            F.prototype = o.parent.prototype;
        } else {
            F.prototype = {};
        }

        //constructor
        var R = function () {
            if (this.construct) {
                this.construct.apply(this, arguments);
            }
        };
        if (o.c) {
            R = o.c;
        }
        R.prototype = new F();

        //config
        var cfg = {};
        if (o.parent && o.parent.prototype.cfg) {
            cfg = $.extend(true, {}, o.parent.prototype.cfg);
        }
        if (o.cfg) {
            for (func in o.cfg) {
                //noinspection JSUnfilteredForInLoop
                cfg[func] = o.cfg[func];
            }
        }
        R.prototype.cfg = cfg;
        if (o.parent) {
            R.prototype.superclass = o.parent.prototype;
            R.superclass = o.parent.prototype;
        }

        //traits
        if (o.traits) {
            for (i = 0; i < o.traits.length; i++) {
                var traits = o.traits[i];
                for (func in traits) {
                    //noinspection JSUnfilteredForInLoop
                    R.prototype[func] = traits[func];
                }
            }
        }

        //methods
        for (func in o.m) {
            //noinspection JSUnfilteredForInLoop
            R.prototype[func] = o.m[func];
        }

        //singleton handling
        var isSingleton = o.isSingleton || false;
        if (isSingleton) {
            R.instance = null;
            R.getInstance = function () {
                if (!R.instance) {
                    R.instance = new R();
                }
                return R.instance;
            };
        }

        //name handling
        R.prototype.getClass = function () {
            return o.nsp + '.' + o.name;
        };
        R.prototype.getClassName = function () {
            return o.name;
        };
        R.prototype.getNsp = function () {
            return o.nsp;
        };

        sx.nsp(o.nsp)[o.name] = R;
    };

    //TODO Client einbinden


    /*** TRAITS ***/

    /**
     * Trait Event
     * Gives a class the ability to act as an Observable
     *
     * adds:
     * - on -> adds a callable function to a named event
     * - trigger ->
     * FÃ¼gt Klassen die mÃ¶glichkeit hinzu, abhÃ¤ngige Klassen zu verwalten
     * Gibt die Methoden
     * - onLoad
     * - onLayout
     * - onReLayout
     * - onUnload
     * an die Kinder weiter
     *
     */
    sx.Event = {
        events: {},
        /**
         * @param event string
         * @param cb function
         * @param once boolean|undefined
         */
        on: function (event, cb, once) {
            once = (once === undefined) ? false : once;
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push({callback: cb, once: once});
        },

        once: function (event, cb) {
            this.on(event, cb, true);
        },

        trigger: function (event, data) {
            var self = this;
            if (this.events[event]) {
                this.events[event].each(function (i) {
                    this.callback(data);
                    if (this.once) {
                        delete self.events[event][i];
                    }
                });
            }
        }
    };


    sx.Layout = {
        initLayout: function () {
            var self = this;

            this.app.on('run', function (data) {
                self.run(data);
            });

            this.app.on('load', function (data) {
                self.load(data);
            });

            this.app.on('draw', function (data) {
                self.draw(data.widthChanged, data.heightChanged, data.step);
            });

            this.app.on('unload', function (data) {
                self.unload(data);
            });
        },
        run: sx.emptyFn(),
        load: sx.emptyFn(),
        draw: sx.emptyFn(),
        unload: sx.emptyFn()
    };

    /**
     * base object
     * parent of all classes
     *
     * includes logging functions for usage within a class
     * <code>this.log('message');</code>
     * or
     * <code>this.info(123, [1,2,3], {'1':'one'})</code>
     */
    sx.build({
        name: 'Obj',

        m: {
            log: function () {
                var log = [this.getClass()].concat($.makeArray(arguments));
                sx.logging.log(log);
            },
            info: function () {
                var log = [this.getClass()].concat($.makeArray(arguments));
                sx.logging.info(log);
            },
            warn: function () {
                var log = [this.getClass()].concat($.makeArray(arguments));
                sx.logging.warn(log);
            },
            error: function () {
                var log = [this.getClass()].concat($.makeArray(arguments));
                sx.logging.error(log);
            },
            exception: function (exceptionName, message) {
                sx.exception(exceptionName, this.getClass() + ': ' + message)
            }
        }
    });


    /**
     * base helper
     * parent class of all helpers
     * spreads the load and layout events
     */
    sx.build({
        name: 'Helper',
        parent: sx.Obj,
        traits: [sx.Layout],

        m: {
            construct: function (app, arg) {
                this.app = app;

                try {
                    //activator for trait Layout
                    this.initLayout();
                    //string hook for subclasses
                    this.init(arg);
                } catch (e) {
                    //falls fehler im Code sind --> verarbeitung abbrechen, aber weiterlaufen lassen
                    this.error('exception during initialization of helper ' + this.getClass() + ': ' + e.message);
                }
            },

            init: function () {
            }
        }
    });


    /**
     * plugin base class
     * all plugins must inhertit this class to be instantiated by the initializer
     *
     * a plugin is instantiated / activated by adding
     * <code>typeof="name.space.of.Class"</code>
     * to your html code
     */
    sx.build({
        name: 'Plugin',
        parent: sx.Obj,
        traits: [sx.Layout],

        m: {
            construct: function (entry, app) {
                this.app = app;

                //main dom node as jquery element
                this.el = entry.el;

                //data parameters become members
                for (var key in entry.data) {
                    if (entry.data.hasOwnProperty(key)) {
                        var elcheck = (typeof entry.data[key] === 'string') && entry.data[key].match(/\$\('(.+)'\)/i);
                        if (elcheck) {
                            this.addKey(key, $(elcheck[1]));
                        } else {
                            this.addKey(key, entry.data[key]);
                        }
                    }
                }

                //subelements annotated with property="name" also become members
                for (key in entry.els) {
                    if (entry.els.hasOwnProperty(key)) {
                        this.addKey(key, entry.els[key]);
                    }
                }

                //init and layout are the hooks for subclasses
                try {
                    this.initLayout();
                    this.init();
                } catch (e) {
                    //in case of errors in the init code --> stop processing, but continue main processes
                    this.error('exception during initialization of plugin ' + this.getClass() + ': ' + e.message);
                }
            },

            addKey: function (key, value) {
                if (typeof(this[key]) !== 'undefined') {
                    throw 'plugin exception in ' + this.getClass() + ': key already defined <' + key + '>';
                }

                this[key] = value;
            },

            init: function () {

            }
        }
    });

    /**
     * initializer class
     * helper class of application
     * loads plugin classes dynamically based on HTML-RDFa-Markup
     * markup of dom nodes: <div typeOf="path.to.nsp.Classname"></div>
     * markup of parameters: <div ... data-key="value"></div>
     * markup of subelements: <div ...><span property="path.to.nsp.Classname.member">content</span></div>
     * subelements of the same name form an array of subelements - so the first is called by variablename[0]
     */
    sx.build({
        name: 'Initializer',
        parent: sx.Obj,

        m: {
            registry: [],

            construct: function (app) {
                this.app = app;

                this.registry = [];
                this.analyzePage();
                this.createInstances();
            },

            setPrefix: function (prefix) {
                this.prefix = prefix;
            },

            analyzePage: function () {
                var results = $('[typeof]');

                var self = this,
                    el,
                    name,
                    prefix = this.prefix || 'sx:';

                results.each(function (key, val) {
                    el = $(val);
                    name = el.attr('typeof');
                    if (name.indexOf(prefix) === 0) {
                        name = name.replace(prefix, '');

                        var entry = {};
                        entry.el = el;
                        entry.name = name;
                        entry.data = entry.el.data();
                        entry.els = {};

                        var subEls = entry.el.find('[property]'),
                            i;

                        for (i = 0; i < subEls.length; i++) {
                            var subEl = subEls.eq(i);
                            entry.els[subEl.attr('property')] = entry.els[subEl.attr('property')] || $('');
                            entry.els[subEl.attr('property')] = entry.els[subEl.attr('property')].add(subEl);
                        }

                        self.registry.push(entry);
                    }
                });
            },

            classExists: function (className) {
                return undefined !== this.createInstance(className);
            },

            createInstances: function () {
                var self = this;

                this.registry.each(function () {
                    this.instance = self.createInstance(this);
                });
            },

            createInstance: function (registryEntry) {
                var tokens = registryEntry.name.split('.'),
                    obj = global,
                    i = 0;

                for (; i < tokens.length; i++) {
                    obj = obj[tokens[i]];
                    if (typeof obj === 'undefined') {
                        return undefined;
                    }
                }

                var instance = new obj(registryEntry, this.app);

                if (instance instanceof sx.Plugin) {
                    return instance;
                } else {
                    instance = {};

                    //noinspection ExceptionCaughtLocallyJS
                    throw 'instance must inherit sx.Plugin';
                }
            }
        }
    });


    /**
     * Application
     * starts the ux rendering process and all plugins/helpers
     * - starts the initializer
     * - activates all helpers
     *
     * helpers can be passed to the constructor as strings.
     * Call it this way:
     *
     * <code>var app = new wb.core.Application('namespace.of.ClassName');</code>
     */
    sx.build({
        name: 'Application',
        parent: sx.Obj,
        traits: [sx.Event, sx.Layout],

        m: {
            construct: function () {
                this.info('starting styx.js ...');
                this.initializePlugins();
                this.initializeHelpers($.makeArray(arguments));
                this.initializeEvents();
            },

            initializePlugins: function () {
                this.initializer = new sx.Initializer(this);
            },

            initializeHelpers: function (helpers) {
                this.registry = [];
                var self = this;

                helpers.each(function () {
                    if ($.type(this) === 'string') {
                        var tokens = this.split('.'),
                            obj = global,
                            i = 0,
                            err = false;

                        for (; i < tokens.length; i++) {
                            obj = obj[tokens[i]];
                            if (typeof obj === 'undefined') {
                                err = true;
                                break;
                            }
                        }
                        if (!err) {
                            try {
                                var helper = new obj(self);
                                self.registry.push(helper);
                            } catch (e) {
                                self.error('helper class <' + this + '> could not be initialized: ' + e.message);
                            }
                        } else {
                            self.error('helper class <' + this + '> could not be initialized: namespace undefined');
                        }
                    } else {
                        self.error('helper class <' + this + '> not provided as string');
                    }
                });
            },

            initializeEvents: function () {
                var self = this;
                jQuery(global).on('resize', function () {
                    self.resolveResolution();
                });

                jQuery(global).on("orientationchange", function () {
                    self.resolveResolution();
                });
            },

            resolveResolution: function () {
                var ol = {
                    w: this.width || 0,
                    h: this.height || 0
                };

                ol.ori = this.ori || 'landscape';

                ol.step = this.step || 'desktop';

                var w = global.innerWidth;
                var h = global.innerHeight;

                this.width = w;
                this.height = h;

                var nw = {
                    w: this.width,
                    h: this.height
                };

                this.ori = (w < h) ? 'portrait' : 'landscape';
                nw.ori = this.ori;

                this.step = "undefined" !== typeof global.getComputedStyle ? global.getComputedStyle(document.body, ":after").getPropertyValue("content") : "desktop";
                nw.step = this.step;

                var widthChanged = ol.w != nw.w;
                var heightChanged = ol.h != nw.h;

                if (widthChanged || heightChanged) {
                    this.trigger('draw', {
                        widthChanged: widthChanged,
                        heightChanged: heightChanged,
                        orientationChanged: ol.ori != nw.ori,
                        responsiveStepChanged: ol.step != nw.step,
                        oldValues: ol,
                        newValues: nw
                    })
                }

            },

            run: function () {
                this.info('running tilion ...');

                this.trigger('run');
                this.trigger('load');
                this.trigger('draw', {
                    widthChanged: true,
                    heightChanged: true,
                    orientationChanged: true,
                    responsiveStepChanged: true,
                    oldValues: null,
                    newValues: null
                });
            }
        }
    });


})(this, jQuery);
