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

/*!
 * Isotope PACKAGED v2.0.1
 * Filter & sort magical layouts
 * http://isotope.metafizzy.co
 */

(function(t){function e(){}function i(t){function i(e){e.prototype.option||(e.prototype.option=function(e){t.isPlainObject(e)&&(this.options=t.extend(!0,this.options,e))})}function n(e,i){t.fn[e]=function(n){if("string"==typeof n){for(var s=o.call(arguments,1),a=0,u=this.length;u>a;a++){var p=this[a],h=t.data(p,e);if(h)if(t.isFunction(h[n])&&"_"!==n.charAt(0)){var f=h[n].apply(h,s);if(void 0!==f)return f}else r("no such method '"+n+"' for "+e+" instance");else r("cannot call methods on "+e+" prior to initialization; "+"attempted to call '"+n+"'")}return this}return this.each(function(){var o=t.data(this,e);o?(o.option(n),o._init()):(o=new i(this,n),t.data(this,e,o))})}}if(t){var r="undefined"==typeof console?e:function(t){console.error(t)};return t.bridget=function(t,e){i(e),n(t,e)},t.bridget}}var o=Array.prototype.slice;"function"==typeof define&&define.amd?define("jquery-bridget/jquery.bridget",["jquery"],i):i(t.jQuery)})(window),function(t){function e(e){var i=t.event;return i.target=i.target||i.srcElement||e,i}var i=document.documentElement,o=function(){};i.addEventListener?o=function(t,e,i){t.addEventListener(e,i,!1)}:i.attachEvent&&(o=function(t,i,o){t[i+o]=o.handleEvent?function(){var i=e(t);o.handleEvent.call(o,i)}:function(){var i=e(t);o.call(t,i)},t.attachEvent("on"+i,t[i+o])});var n=function(){};i.removeEventListener?n=function(t,e,i){t.removeEventListener(e,i,!1)}:i.detachEvent&&(n=function(t,e,i){t.detachEvent("on"+e,t[e+i]);try{delete t[e+i]}catch(o){t[e+i]=void 0}});var r={bind:o,unbind:n};"function"==typeof define&&define.amd?define("eventie/eventie",r):"object"==typeof exports?module.exports=r:t.eventie=r}(this),function(t){function e(t){"function"==typeof t&&(e.isReady?t():r.push(t))}function i(t){var i="readystatechange"===t.type&&"complete"!==n.readyState;if(!e.isReady&&!i){e.isReady=!0;for(var o=0,s=r.length;s>o;o++){var a=r[o];a()}}}function o(o){return o.bind(n,"DOMContentLoaded",i),o.bind(n,"readystatechange",i),o.bind(t,"load",i),e}var n=t.document,r=[];e.isReady=!1,"function"==typeof define&&define.amd?(e.isReady="function"==typeof requirejs,define("doc-ready/doc-ready",["eventie/eventie"],o)):t.docReady=o(t.eventie)}(this),function(){function t(){}function e(t,e){for(var i=t.length;i--;)if(t[i].listener===e)return i;return-1}function i(t){return function(){return this[t].apply(this,arguments)}}var o=t.prototype,n=this,r=n.EventEmitter;o.getListeners=function(t){var e,i,o=this._getEvents();if(t instanceof RegExp){e={};for(i in o)o.hasOwnProperty(i)&&t.test(i)&&(e[i]=o[i])}else e=o[t]||(o[t]=[]);return e},o.flattenListeners=function(t){var e,i=[];for(e=0;t.length>e;e+=1)i.push(t[e].listener);return i},o.getListenersAsObject=function(t){var e,i=this.getListeners(t);return i instanceof Array&&(e={},e[t]=i),e||i},o.addListener=function(t,i){var o,n=this.getListenersAsObject(t),r="object"==typeof i;for(o in n)n.hasOwnProperty(o)&&-1===e(n[o],i)&&n[o].push(r?i:{listener:i,once:!1});return this},o.on=i("addListener"),o.addOnceListener=function(t,e){return this.addListener(t,{listener:e,once:!0})},o.once=i("addOnceListener"),o.defineEvent=function(t){return this.getListeners(t),this},o.defineEvents=function(t){for(var e=0;t.length>e;e+=1)this.defineEvent(t[e]);return this},o.removeListener=function(t,i){var o,n,r=this.getListenersAsObject(t);for(n in r)r.hasOwnProperty(n)&&(o=e(r[n],i),-1!==o&&r[n].splice(o,1));return this},o.off=i("removeListener"),o.addListeners=function(t,e){return this.manipulateListeners(!1,t,e)},o.removeListeners=function(t,e){return this.manipulateListeners(!0,t,e)},o.manipulateListeners=function(t,e,i){var o,n,r=t?this.removeListener:this.addListener,s=t?this.removeListeners:this.addListeners;if("object"!=typeof e||e instanceof RegExp)for(o=i.length;o--;)r.call(this,e,i[o]);else for(o in e)e.hasOwnProperty(o)&&(n=e[o])&&("function"==typeof n?r.call(this,o,n):s.call(this,o,n));return this},o.removeEvent=function(t){var e,i=typeof t,o=this._getEvents();if("string"===i)delete o[t];else if(t instanceof RegExp)for(e in o)o.hasOwnProperty(e)&&t.test(e)&&delete o[e];else delete this._events;return this},o.removeAllListeners=i("removeEvent"),o.emitEvent=function(t,e){var i,o,n,r,s=this.getListenersAsObject(t);for(n in s)if(s.hasOwnProperty(n))for(o=s[n].length;o--;)i=s[n][o],i.once===!0&&this.removeListener(t,i.listener),r=i.listener.apply(this,e||[]),r===this._getOnceReturnValue()&&this.removeListener(t,i.listener);return this},o.trigger=i("emitEvent"),o.emit=function(t){var e=Array.prototype.slice.call(arguments,1);return this.emitEvent(t,e)},o.setOnceReturnValue=function(t){return this._onceReturnValue=t,this},o._getOnceReturnValue=function(){return this.hasOwnProperty("_onceReturnValue")?this._onceReturnValue:!0},o._getEvents=function(){return this._events||(this._events={})},t.noConflict=function(){return n.EventEmitter=r,t},"function"==typeof define&&define.amd?define("eventEmitter/EventEmitter",[],function(){return t}):"object"==typeof module&&module.exports?module.exports=t:this.EventEmitter=t}.call(this),function(t){function e(t){if(t){if("string"==typeof o[t])return t;t=t.charAt(0).toUpperCase()+t.slice(1);for(var e,n=0,r=i.length;r>n;n++)if(e=i[n]+t,"string"==typeof o[e])return e}}var i="Webkit Moz ms Ms O".split(" "),o=document.documentElement.style;"function"==typeof define&&define.amd?define("get-style-property/get-style-property",[],function(){return e}):"object"==typeof exports?module.exports=e:t.getStyleProperty=e}(window),function(t){function e(t){var e=parseFloat(t),i=-1===t.indexOf("%")&&!isNaN(e);return i&&e}function i(){for(var t={width:0,height:0,innerWidth:0,innerHeight:0,outerWidth:0,outerHeight:0},e=0,i=s.length;i>e;e++){var o=s[e];t[o]=0}return t}function o(t){function o(t){if("string"==typeof t&&(t=document.querySelector(t)),t&&"object"==typeof t&&t.nodeType){var o=r(t);if("none"===o.display)return i();var n={};n.width=t.offsetWidth,n.height=t.offsetHeight;for(var h=n.isBorderBox=!(!p||!o[p]||"border-box"!==o[p]),f=0,d=s.length;d>f;f++){var l=s[f],c=o[l];c=a(t,c);var y=parseFloat(c);n[l]=isNaN(y)?0:y}var m=n.paddingLeft+n.paddingRight,g=n.paddingTop+n.paddingBottom,v=n.marginLeft+n.marginRight,_=n.marginTop+n.marginBottom,I=n.borderLeftWidth+n.borderRightWidth,L=n.borderTopWidth+n.borderBottomWidth,z=h&&u,S=e(o.width);S!==!1&&(n.width=S+(z?0:m+I));var b=e(o.height);return b!==!1&&(n.height=b+(z?0:g+L)),n.innerWidth=n.width-(m+I),n.innerHeight=n.height-(g+L),n.outerWidth=n.width+v,n.outerHeight=n.height+_,n}}function a(t,e){if(n||-1===e.indexOf("%"))return e;var i=t.style,o=i.left,r=t.runtimeStyle,s=r&&r.left;return s&&(r.left=t.currentStyle.left),i.left=e,e=i.pixelLeft,i.left=o,s&&(r.left=s),e}var u,p=t("boxSizing");return function(){if(p){var t=document.createElement("div");t.style.width="200px",t.style.padding="1px 2px 3px 4px",t.style.borderStyle="solid",t.style.borderWidth="1px 2px 3px 4px",t.style[p]="border-box";var i=document.body||document.documentElement;i.appendChild(t);var o=r(t);u=200===e(o.width),i.removeChild(t)}}(),o}var n=t.getComputedStyle,r=n?function(t){return n(t,null)}:function(t){return t.currentStyle},s=["paddingLeft","paddingRight","paddingTop","paddingBottom","marginLeft","marginRight","marginTop","marginBottom","borderLeftWidth","borderRightWidth","borderTopWidth","borderBottomWidth"];"function"==typeof define&&define.amd?define("get-size/get-size",["get-style-property/get-style-property"],o):"object"==typeof exports?module.exports=o(require("get-style-property")):t.getSize=o(t.getStyleProperty)}(window),function(t,e){function i(t,e){return t[a](e)}function o(t){if(!t.parentNode){var e=document.createDocumentFragment();e.appendChild(t)}}function n(t,e){o(t);for(var i=t.parentNode.querySelectorAll(e),n=0,r=i.length;r>n;n++)if(i[n]===t)return!0;return!1}function r(t,e){return o(t),i(t,e)}var s,a=function(){if(e.matchesSelector)return"matchesSelector";for(var t=["webkit","moz","ms","o"],i=0,o=t.length;o>i;i++){var n=t[i],r=n+"MatchesSelector";if(e[r])return r}}();if(a){var u=document.createElement("div"),p=i(u,"div");s=p?i:r}else s=n;"function"==typeof define&&define.amd?define("matches-selector/matches-selector",[],function(){return s}):window.matchesSelector=s}(this,Element.prototype),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){for(var e in t)return!1;return e=null,!0}function o(t){return t.replace(/([A-Z])/g,function(t){return"-"+t.toLowerCase()})}function n(t,n,r){function a(t,e){t&&(this.element=t,this.layout=e,this.position={x:0,y:0},this._create())}var u=r("transition"),p=r("transform"),h=u&&p,f=!!r("perspective"),d={WebkitTransition:"webkitTransitionEnd",MozTransition:"transitionend",OTransition:"otransitionend",transition:"transitionend"}[u],l=["transform","transition","transitionDuration","transitionProperty"],c=function(){for(var t={},e=0,i=l.length;i>e;e++){var o=l[e],n=r(o);n&&n!==o&&(t[o]=n)}return t}();e(a.prototype,t.prototype),a.prototype._create=function(){this._transn={ingProperties:{},clean:{},onEnd:{}},this.css({position:"absolute"})},a.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},a.prototype.getSize=function(){this.size=n(this.element)},a.prototype.css=function(t){var e=this.element.style;for(var i in t){var o=c[i]||i;e[o]=t[i]}},a.prototype.getPosition=function(){var t=s(this.element),e=this.layout.options,i=e.isOriginLeft,o=e.isOriginTop,n=parseInt(t[i?"left":"right"],10),r=parseInt(t[o?"top":"bottom"],10);n=isNaN(n)?0:n,r=isNaN(r)?0:r;var a=this.layout.size;n-=i?a.paddingLeft:a.paddingRight,r-=o?a.paddingTop:a.paddingBottom,this.position.x=n,this.position.y=r},a.prototype.layoutPosition=function(){var t=this.layout.size,e=this.layout.options,i={};e.isOriginLeft?(i.left=this.position.x+t.paddingLeft+"px",i.right=""):(i.right=this.position.x+t.paddingRight+"px",i.left=""),e.isOriginTop?(i.top=this.position.y+t.paddingTop+"px",i.bottom=""):(i.bottom=this.position.y+t.paddingBottom+"px",i.top=""),this.css(i),this.emitEvent("layout",[this])};var y=f?function(t,e){return"translate3d("+t+"px, "+e+"px, 0)"}:function(t,e){return"translate("+t+"px, "+e+"px)"};a.prototype._transitionTo=function(t,e){this.getPosition();var i=this.position.x,o=this.position.y,n=parseInt(t,10),r=parseInt(e,10),s=n===this.position.x&&r===this.position.y;if(this.setPosition(t,e),s&&!this.isTransitioning)return this.layoutPosition(),void 0;var a=t-i,u=e-o,p={},h=this.layout.options;a=h.isOriginLeft?a:-a,u=h.isOriginTop?u:-u,p.transform=y(a,u),this.transition({to:p,onTransitionEnd:{transform:this.layoutPosition},isCleaning:!0})},a.prototype.goTo=function(t,e){this.setPosition(t,e),this.layoutPosition()},a.prototype.moveTo=h?a.prototype._transitionTo:a.prototype.goTo,a.prototype.setPosition=function(t,e){this.position.x=parseInt(t,10),this.position.y=parseInt(e,10)},a.prototype._nonTransition=function(t){this.css(t.to),t.isCleaning&&this._removeStyles(t.to);for(var e in t.onTransitionEnd)t.onTransitionEnd[e].call(this)},a.prototype._transition=function(t){if(!parseFloat(this.layout.options.transitionDuration))return this._nonTransition(t),void 0;var e=this._transn;for(var i in t.onTransitionEnd)e.onEnd[i]=t.onTransitionEnd[i];for(i in t.to)e.ingProperties[i]=!0,t.isCleaning&&(e.clean[i]=!0);if(t.from){this.css(t.from);var o=this.element.offsetHeight;o=null}this.enableTransition(t.to),this.css(t.to),this.isTransitioning=!0};var m=p&&o(p)+",opacity";a.prototype.enableTransition=function(){this.isTransitioning||(this.css({transitionProperty:m,transitionDuration:this.layout.options.transitionDuration}),this.element.addEventListener(d,this,!1))},a.prototype.transition=a.prototype[u?"_transition":"_nonTransition"],a.prototype.onwebkitTransitionEnd=function(t){this.ontransitionend(t)},a.prototype.onotransitionend=function(t){this.ontransitionend(t)};var g={"-webkit-transform":"transform","-moz-transform":"transform","-o-transform":"transform"};a.prototype.ontransitionend=function(t){if(t.target===this.element){var e=this._transn,o=g[t.propertyName]||t.propertyName;if(delete e.ingProperties[o],i(e.ingProperties)&&this.disableTransition(),o in e.clean&&(this.element.style[t.propertyName]="",delete e.clean[o]),o in e.onEnd){var n=e.onEnd[o];n.call(this),delete e.onEnd[o]}this.emitEvent("transitionEnd",[this])}},a.prototype.disableTransition=function(){this.removeTransitionStyles(),this.element.removeEventListener(d,this,!1),this.isTransitioning=!1},a.prototype._removeStyles=function(t){var e={};for(var i in t)e[i]="";this.css(e)};var v={transitionProperty:"",transitionDuration:""};return a.prototype.removeTransitionStyles=function(){this.css(v)},a.prototype.removeElem=function(){this.element.parentNode.removeChild(this.element),this.emitEvent("remove",[this])},a.prototype.remove=function(){if(!u||!parseFloat(this.layout.options.transitionDuration))return this.removeElem(),void 0;var t=this;this.on("transitionEnd",function(){return t.removeElem(),!0}),this.hide()},a.prototype.reveal=function(){delete this.isHidden,this.css({display:""});var t=this.layout.options;this.transition({from:t.hiddenStyle,to:t.visibleStyle,isCleaning:!0})},a.prototype.hide=function(){this.isHidden=!0,this.css({display:""});var t=this.layout.options;this.transition({from:t.visibleStyle,to:t.hiddenStyle,isCleaning:!0,onTransitionEnd:{opacity:function(){this.isHidden&&this.css({display:"none"})}}})},a.prototype.destroy=function(){this.css({position:"",left:"",right:"",top:"",bottom:"",transition:"",transform:""})},a}var r=t.getComputedStyle,s=r?function(t){return r(t,null)}:function(t){return t.currentStyle};"function"==typeof define&&define.amd?define("outlayer/item",["eventEmitter/EventEmitter","get-size/get-size","get-style-property/get-style-property"],n):(t.Outlayer={},t.Outlayer.Item=n(t.EventEmitter,t.getSize,t.getStyleProperty))}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===f.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=l(e,t);-1!==i&&e.splice(i,1)}function r(t){return t.replace(/(.)([A-Z])/g,function(t,e,i){return e+"-"+i}).toLowerCase()}function s(i,s,f,l,c,y){function m(t,i){if("string"==typeof t&&(t=a.querySelector(t)),!t||!d(t))return u&&u.error("Bad "+this.constructor.namespace+" element: "+t),void 0;this.element=t,this.options=e({},this.constructor.defaults),this.option(i);var o=++g;this.element.outlayerGUID=o,v[o]=this,this._create(),this.options.isInitLayout&&this.layout()}var g=0,v={};return m.namespace="outlayer",m.Item=y,m.defaults={containerStyle:{position:"relative"},isInitLayout:!0,isOriginLeft:!0,isOriginTop:!0,isResizeBound:!0,isResizingContainer:!0,transitionDuration:"0.4s",hiddenStyle:{opacity:0,transform:"scale(0.001)"},visibleStyle:{opacity:1,transform:"scale(1)"}},e(m.prototype,f.prototype),m.prototype.option=function(t){e(this.options,t)},m.prototype._create=function(){this.reloadItems(),this.stamps=[],this.stamp(this.options.stamp),e(this.element.style,this.options.containerStyle),this.options.isResizeBound&&this.bindResize()},m.prototype.reloadItems=function(){this.items=this._itemize(this.element.children)},m.prototype._itemize=function(t){for(var e=this._filterFindItemElements(t),i=this.constructor.Item,o=[],n=0,r=e.length;r>n;n++){var s=e[n],a=new i(s,this);o.push(a)}return o},m.prototype._filterFindItemElements=function(t){t=o(t);for(var e=this.options.itemSelector,i=[],n=0,r=t.length;r>n;n++){var s=t[n];if(d(s))if(e){c(s,e)&&i.push(s);for(var a=s.querySelectorAll(e),u=0,p=a.length;p>u;u++)i.push(a[u])}else i.push(s)}return i},m.prototype.getItemElements=function(){for(var t=[],e=0,i=this.items.length;i>e;e++)t.push(this.items[e].element);return t},m.prototype.layout=function(){this._resetLayout(),this._manageStamps();var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;this.layoutItems(this.items,t),this._isLayoutInited=!0},m.prototype._init=m.prototype.layout,m.prototype._resetLayout=function(){this.getSize()},m.prototype.getSize=function(){this.size=l(this.element)},m.prototype._getMeasurement=function(t,e){var i,o=this.options[t];o?("string"==typeof o?i=this.element.querySelector(o):d(o)&&(i=o),this[t]=i?l(i)[e]:o):this[t]=0},m.prototype.layoutItems=function(t,e){t=this._getItemsForLayout(t),this._layoutItems(t,e),this._postLayout()},m.prototype._getItemsForLayout=function(t){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i];n.isIgnored||e.push(n)}return e},m.prototype._layoutItems=function(t,e){function i(){o.emitEvent("layoutComplete",[o,t])}var o=this;if(!t||!t.length)return i(),void 0;this._itemsOn(t,"layout",i);for(var n=[],r=0,s=t.length;s>r;r++){var a=t[r],u=this._getItemLayoutPosition(a);u.item=a,u.isInstant=e||a.isLayoutInstant,n.push(u)}this._processLayoutQueue(n)},m.prototype._getItemLayoutPosition=function(){return{x:0,y:0}},m.prototype._processLayoutQueue=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];this._positionItem(o.item,o.x,o.y,o.isInstant)}},m.prototype._positionItem=function(t,e,i,o){o?t.goTo(e,i):t.moveTo(e,i)},m.prototype._postLayout=function(){this.resizeContainer()},m.prototype.resizeContainer=function(){if(this.options.isResizingContainer){var t=this._getContainerSize();t&&(this._setContainerMeasure(t.width,!0),this._setContainerMeasure(t.height,!1))}},m.prototype._getContainerSize=h,m.prototype._setContainerMeasure=function(t,e){if(void 0!==t){var i=this.size;i.isBorderBox&&(t+=e?i.paddingLeft+i.paddingRight+i.borderLeftWidth+i.borderRightWidth:i.paddingBottom+i.paddingTop+i.borderTopWidth+i.borderBottomWidth),t=Math.max(t,0),this.element.style[e?"width":"height"]=t+"px"}},m.prototype._itemsOn=function(t,e,i){function o(){return n++,n===r&&i.call(s),!0}for(var n=0,r=t.length,s=this,a=0,u=t.length;u>a;a++){var p=t[a];p.on(e,o)}},m.prototype.ignore=function(t){var e=this.getItem(t);e&&(e.isIgnored=!0)},m.prototype.unignore=function(t){var e=this.getItem(t);e&&delete e.isIgnored},m.prototype.stamp=function(t){if(t=this._find(t)){this.stamps=this.stamps.concat(t);for(var e=0,i=t.length;i>e;e++){var o=t[e];this.ignore(o)}}},m.prototype.unstamp=function(t){if(t=this._find(t))for(var e=0,i=t.length;i>e;e++){var o=t[e];n(o,this.stamps),this.unignore(o)}},m.prototype._find=function(t){return t?("string"==typeof t&&(t=this.element.querySelectorAll(t)),t=o(t)):void 0},m.prototype._manageStamps=function(){if(this.stamps&&this.stamps.length){this._getBoundingRect();for(var t=0,e=this.stamps.length;e>t;t++){var i=this.stamps[t];this._manageStamp(i)}}},m.prototype._getBoundingRect=function(){var t=this.element.getBoundingClientRect(),e=this.size;this._boundingRect={left:t.left+e.paddingLeft+e.borderLeftWidth,top:t.top+e.paddingTop+e.borderTopWidth,right:t.right-(e.paddingRight+e.borderRightWidth),bottom:t.bottom-(e.paddingBottom+e.borderBottomWidth)}},m.prototype._manageStamp=h,m.prototype._getElementOffset=function(t){var e=t.getBoundingClientRect(),i=this._boundingRect,o=l(t),n={left:e.left-i.left-o.marginLeft,top:e.top-i.top-o.marginTop,right:i.right-e.right-o.marginRight,bottom:i.bottom-e.bottom-o.marginBottom};return n},m.prototype.handleEvent=function(t){var e="on"+t.type;this[e]&&this[e](t)},m.prototype.bindResize=function(){this.isResizeBound||(i.bind(t,"resize",this),this.isResizeBound=!0)},m.prototype.unbindResize=function(){this.isResizeBound&&i.unbind(t,"resize",this),this.isResizeBound=!1},m.prototype.onresize=function(){function t(){e.resize(),delete e.resizeTimeout}this.resizeTimeout&&clearTimeout(this.resizeTimeout);var e=this;this.resizeTimeout=setTimeout(t,100)},m.prototype.resize=function(){this.isResizeBound&&this.needsResizeLayout()&&this.layout()},m.prototype.needsResizeLayout=function(){var t=l(this.element),e=this.size&&t;return e&&t.innerWidth!==this.size.innerWidth},m.prototype.addItems=function(t){var e=this._itemize(t);return e.length&&(this.items=this.items.concat(e)),e},m.prototype.appended=function(t){var e=this.addItems(t);e.length&&(this.layoutItems(e,!0),this.reveal(e))},m.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps(),this.layoutItems(e,!0),this.reveal(e),this.layoutItems(i)}},m.prototype.reveal=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.reveal()}},m.prototype.hide=function(t){var e=t&&t.length;if(e)for(var i=0;e>i;i++){var o=t[i];o.hide()}},m.prototype.getItem=function(t){for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];if(o.element===t)return o}},m.prototype.getItems=function(t){if(t&&t.length){for(var e=[],i=0,o=t.length;o>i;i++){var n=t[i],r=this.getItem(n);r&&e.push(r)}return e}},m.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(e&&e.length){this._itemsOn(e,"remove",function(){this.emitEvent("removeComplete",[this,e])});for(var i=0,r=e.length;r>i;i++){var s=e[i];s.remove(),n(s,this.items)}}},m.prototype.destroy=function(){var t=this.element.style;t.height="",t.position="",t.width="";for(var e=0,i=this.items.length;i>e;e++){var o=this.items[e];o.destroy()}this.unbindResize(),delete this.element.outlayerGUID,p&&p.removeData(this.element,this.constructor.namespace)},m.data=function(t){var e=t&&t.outlayerGUID;return e&&v[e]},m.create=function(t,i){function o(){m.apply(this,arguments)}return Object.create?o.prototype=Object.create(m.prototype):e(o.prototype,m.prototype),o.prototype.constructor=o,o.defaults=e({},m.defaults),e(o.defaults,i),o.prototype.settings={},o.namespace=t,o.data=m.data,o.Item=function(){y.apply(this,arguments)},o.Item.prototype=new y,s(function(){for(var e=r(t),i=a.querySelectorAll(".js-"+e),n="data-"+e+"-options",s=0,h=i.length;h>s;s++){var f,d=i[s],l=d.getAttribute(n);try{f=l&&JSON.parse(l)}catch(c){u&&u.error("Error parsing "+n+" on "+d.nodeName.toLowerCase()+(d.id?"#"+d.id:"")+": "+c);continue}var y=new o(d,f);p&&p.data(d,t,y)}}),p&&p.bridget&&p.bridget(t,o),o},m.Item=y,m}var a=t.document,u=t.console,p=t.jQuery,h=function(){},f=Object.prototype.toString,d="object"==typeof HTMLElement?function(t){return t instanceof HTMLElement}:function(t){return t&&"object"==typeof t&&1===t.nodeType&&"string"==typeof t.nodeName},l=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define("outlayer/outlayer",["eventie/eventie","doc-ready/doc-ready","eventEmitter/EventEmitter","get-size/get-size","matches-selector/matches-selector","./item"],s):t.Outlayer=s(t.eventie,t.docReady,t.EventEmitter,t.getSize,t.matchesSelector,t.Outlayer.Item)}(window),function(t){function e(t){function e(){t.Item.apply(this,arguments)}e.prototype=new t.Item,e.prototype._create=function(){this.id=this.layout.itemGUID++,t.Item.prototype._create.call(this),this.sortData={}},e.prototype.updateSortData=function(){if(!this.isIgnored){this.sortData.id=this.id,this.sortData["original-order"]=this.id,this.sortData.random=Math.random();var t=this.layout.options.getSortData,e=this.layout._sorters;for(var i in t){var o=e[i];this.sortData[i]=o(this.element,this)}}};var i=e.prototype.destroy;return e.prototype.destroy=function(){i.apply(this,arguments),this.css({display:""})},e}"function"==typeof define&&define.amd?define("isotope/js/item",["outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.Item=e(t.Outlayer))}(window),function(t){function e(t,e){function i(t){this.isotope=t,t&&(this.options=t.options[this.namespace],this.element=t.element,this.items=t.filteredItems,this.size=t.size)}return function(){function t(t){return function(){return e.prototype[t].apply(this.isotope,arguments)}}for(var o=["_resetLayout","_getItemLayoutPosition","_manageStamp","_getContainerSize","_getElementOffset","needsResizeLayout"],n=0,r=o.length;r>n;n++){var s=o[n];i.prototype[s]=t(s)}}(),i.prototype.needsVerticalResizeLayout=function(){var e=t(this.isotope.element),i=this.isotope.size&&e;return i&&e.innerHeight!==this.isotope.size.innerHeight},i.prototype._getMeasurement=function(){this.isotope._getMeasurement.apply(this,arguments)},i.prototype.getColumnWidth=function(){this.getSegmentSize("column","Width")},i.prototype.getRowHeight=function(){this.getSegmentSize("row","Height")},i.prototype.getSegmentSize=function(t,e){var i=t+e,o="outer"+e;if(this._getMeasurement(i,o),!this[i]){var n=this.getFirstItemSize();this[i]=n&&n[o]||this.isotope.size["inner"+e]}},i.prototype.getFirstItemSize=function(){var e=this.isotope.filteredItems[0];return e&&e.element&&t(e.element)},i.prototype.layout=function(){this.isotope.layout.apply(this.isotope,arguments)},i.prototype.getSize=function(){this.isotope.getSize(),this.size=this.isotope.size},i.modes={},i.create=function(t,e){function o(){i.apply(this,arguments)}return o.prototype=new i,e&&(o.options=e),o.prototype.namespace=t,i.modes[t]=o,o},i}"function"==typeof define&&define.amd?define("isotope/js/layout-mode",["get-size/get-size","outlayer/outlayer"],e):(t.Isotope=t.Isotope||{},t.Isotope.LayoutMode=e(t.getSize,t.Outlayer))}(window),function(t){function e(t,e){var o=t.create("masonry");return o.prototype._resetLayout=function(){this.getSize(),this._getMeasurement("columnWidth","outerWidth"),this._getMeasurement("gutter","outerWidth"),this.measureColumns();var t=this.cols;for(this.colYs=[];t--;)this.colYs.push(0);this.maxY=0},o.prototype.measureColumns=function(){if(this.getContainerWidth(),!this.columnWidth){var t=this.items[0],i=t&&t.element;this.columnWidth=i&&e(i).outerWidth||this.containerWidth}this.columnWidth+=this.gutter,this.cols=Math.floor((this.containerWidth+this.gutter)/this.columnWidth),this.cols=Math.max(this.cols,1)},o.prototype.getContainerWidth=function(){var t=this.options.isFitWidth?this.element.parentNode:this.element,i=e(t);this.containerWidth=i&&i.innerWidth},o.prototype._getItemLayoutPosition=function(t){t.getSize();var e=t.size.outerWidth%this.columnWidth,o=e&&1>e?"round":"ceil",n=Math[o](t.size.outerWidth/this.columnWidth);n=Math.min(n,this.cols);for(var r=this._getColGroup(n),s=Math.min.apply(Math,r),a=i(r,s),u={x:this.columnWidth*a,y:s},p=s+t.size.outerHeight,h=this.cols+1-r.length,f=0;h>f;f++)this.colYs[a+f]=p;return u},o.prototype._getColGroup=function(t){if(2>t)return this.colYs;for(var e=[],i=this.cols+1-t,o=0;i>o;o++){var n=this.colYs.slice(o,o+t);e[o]=Math.max.apply(Math,n)}return e},o.prototype._manageStamp=function(t){var i=e(t),o=this._getElementOffset(t),n=this.options.isOriginLeft?o.left:o.right,r=n+i.outerWidth,s=Math.floor(n/this.columnWidth);s=Math.max(0,s);var a=Math.floor(r/this.columnWidth);a-=r%this.columnWidth?0:1,a=Math.min(this.cols-1,a);for(var u=(this.options.isOriginTop?o.top:o.bottom)+i.outerHeight,p=s;a>=p;p++)this.colYs[p]=Math.max(u,this.colYs[p])},o.prototype._getContainerSize=function(){this.maxY=Math.max.apply(Math,this.colYs);var t={height:this.maxY};return this.options.isFitWidth&&(t.width=this._getContainerFitWidth()),t},o.prototype._getContainerFitWidth=function(){for(var t=0,e=this.cols;--e&&0===this.colYs[e];)t++;return(this.cols-t)*this.columnWidth-this.gutter},o.prototype.needsResizeLayout=function(){var t=this.containerWidth;return this.getContainerWidth(),t!==this.containerWidth},o}var i=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++){var n=t[i];if(n===e)return i}return-1};"function"==typeof define&&define.amd?define("masonry/masonry",["outlayer/outlayer","get-size/get-size"],e):t.Masonry=e(t.Outlayer,t.getSize)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t,i){var o=t.create("masonry"),n=o.prototype._getElementOffset,r=o.prototype.layout,s=o.prototype._getMeasurement;e(o.prototype,i.prototype),o.prototype._getElementOffset=n,o.prototype.layout=r,o.prototype._getMeasurement=s;var a=o.prototype.measureColumns;o.prototype.measureColumns=function(){this.items=this.isotope.filteredItems,a.call(this)};var u=o.prototype._manageStamp;return o.prototype._manageStamp=function(){this.options.isOriginLeft=this.isotope.options.isOriginLeft,this.options.isOriginTop=this.isotope.options.isOriginTop,u.apply(this,arguments)},o}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/masonry",["../layout-mode","masonry/masonry"],i):i(t.Isotope.LayoutMode,t.Masonry)}(window),function(t){function e(t){var e=t.create("fitRows");return e.prototype._resetLayout=function(){this.x=0,this.y=0,this.maxY=0},e.prototype._getItemLayoutPosition=function(t){t.getSize(),0!==this.x&&t.size.outerWidth+this.x>this.isotope.size.innerWidth&&(this.x=0,this.y=this.maxY);var e={x:this.x,y:this.y};return this.maxY=Math.max(this.maxY,this.y+t.size.outerHeight),this.x+=t.size.outerWidth,e},e.prototype._getContainerSize=function(){return{height:this.maxY}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/fit-rows",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t){var e=t.create("vertical",{horizontalAlignment:0});return e.prototype._resetLayout=function(){this.y=0},e.prototype._getItemLayoutPosition=function(t){t.getSize();var e=(this.isotope.size.innerWidth-t.size.outerWidth)*this.options.horizontalAlignment,i=this.y;return this.y+=t.size.outerHeight,{x:e,y:i}},e.prototype._getContainerSize=function(){return{height:this.y}},e}"function"==typeof define&&define.amd?define("isotope/js/layout-modes/vertical",["../layout-mode"],e):e(t.Isotope.LayoutMode)}(window),function(t){function e(t,e){for(var i in e)t[i]=e[i];return t}function i(t){return"[object Array]"===h.call(t)}function o(t){var e=[];if(i(t))e=t;else if(t&&"number"==typeof t.length)for(var o=0,n=t.length;n>o;o++)e.push(t[o]);else e.push(t);return e}function n(t,e){var i=f(e,t);-1!==i&&e.splice(i,1)}function r(t,i,r,u,h){function f(t,e){return function(i,o){for(var n=0,r=t.length;r>n;n++){var s=t[n],a=i.sortData[s],u=o.sortData[s];if(a>u||u>a){var p=void 0!==e[s]?e[s]:e,h=p?1:-1;return(a>u?1:-1)*h}}return 0}}var d=t.create("isotope",{layoutMode:"masonry",isJQueryFiltering:!0,sortAscending:!0});d.Item=u,d.LayoutMode=h,d.prototype._create=function(){this.itemGUID=0,this._sorters={},this._getSorters(),t.prototype._create.call(this),this.modes={},this.filteredItems=this.items,this.sortHistory=["original-order"];for(var e in h.modes)this._initLayoutMode(e)},d.prototype.reloadItems=function(){this.itemGUID=0,t.prototype.reloadItems.call(this)},d.prototype._itemize=function(){for(var e=t.prototype._itemize.apply(this,arguments),i=0,o=e.length;o>i;i++){var n=e[i];n.id=this.itemGUID++}return this._updateItemsSortData(e),e},d.prototype._initLayoutMode=function(t){var i=h.modes[t],o=this.options[t]||{};this.options[t]=i.options?e(i.options,o):o,this.modes[t]=new i(this)},d.prototype.layout=function(){return!this._isLayoutInited&&this.options.isInitLayout?(this.arrange(),void 0):(this._layout(),void 0)},d.prototype._layout=function(){var t=this._getIsInstant();this._resetLayout(),this._manageStamps(),this.layoutItems(this.filteredItems,t),this._isLayoutInited=!0},d.prototype.arrange=function(t){this.option(t),this._getIsInstant(),this.filteredItems=this._filter(this.items),this._sort(),this._layout()},d.prototype._init=d.prototype.arrange,d.prototype._getIsInstant=function(){var t=void 0!==this.options.isLayoutInstant?this.options.isLayoutInstant:!this._isLayoutInited;return this._isInstant=t,t},d.prototype._filter=function(t){function e(){f.reveal(n),f.hide(r)}var i=this.options.filter;i=i||"*";for(var o=[],n=[],r=[],s=this._getFilterTest(i),a=0,u=t.length;u>a;a++){var p=t[a];if(!p.isIgnored){var h=s(p);h&&o.push(p),h&&p.isHidden?n.push(p):h||p.isHidden||r.push(p)}}var f=this;return this._isInstant?this._noTransition(e):e(),o},d.prototype._getFilterTest=function(t){return s&&this.options.isJQueryFiltering?function(e){return s(e.element).is(t)}:"function"==typeof t?function(e){return t(e.element)}:function(e){return r(e.element,t)}},d.prototype.updateSortData=function(t){this._getSorters(),t=o(t);
var e=this.getItems(t);e=e.length?e:this.items,this._updateItemsSortData(e)},d.prototype._getSorters=function(){var t=this.options.getSortData;for(var e in t){var i=t[e];this._sorters[e]=l(i)}},d.prototype._updateItemsSortData=function(t){for(var e=0,i=t.length;i>e;e++){var o=t[e];o.updateSortData()}};var l=function(){function t(t){if("string"!=typeof t)return t;var i=a(t).split(" "),o=i[0],n=o.match(/^\[(.+)\]$/),r=n&&n[1],s=e(r,o),u=d.sortDataParsers[i[1]];return t=u?function(t){return t&&u(s(t))}:function(t){return t&&s(t)}}function e(t,e){var i;return i=t?function(e){return e.getAttribute(t)}:function(t){var i=t.querySelector(e);return i&&p(i)}}return t}();d.sortDataParsers={parseInt:function(t){return parseInt(t,10)},parseFloat:function(t){return parseFloat(t)}},d.prototype._sort=function(){var t=this.options.sortBy;if(t){var e=[].concat.apply(t,this.sortHistory),i=f(e,this.options.sortAscending);this.filteredItems.sort(i),t!==this.sortHistory[0]&&this.sortHistory.unshift(t)}},d.prototype._mode=function(){var t=this.options.layoutMode,e=this.modes[t];if(!e)throw Error("No layout mode: "+t);return e.options=this.options[t],e},d.prototype._resetLayout=function(){t.prototype._resetLayout.call(this),this._mode()._resetLayout()},d.prototype._getItemLayoutPosition=function(t){return this._mode()._getItemLayoutPosition(t)},d.prototype._manageStamp=function(t){this._mode()._manageStamp(t)},d.prototype._getContainerSize=function(){return this._mode()._getContainerSize()},d.prototype.needsResizeLayout=function(){return this._mode().needsResizeLayout()},d.prototype.appended=function(t){var e=this.addItems(t);if(e.length){var i=this._filterRevealAdded(e);this.filteredItems=this.filteredItems.concat(i)}},d.prototype.prepended=function(t){var e=this._itemize(t);if(e.length){var i=this.items.slice(0);this.items=e.concat(i),this._resetLayout(),this._manageStamps();var o=this._filterRevealAdded(e);this.layoutItems(i),this.filteredItems=o.concat(this.filteredItems)}},d.prototype._filterRevealAdded=function(t){var e=this._noTransition(function(){return this._filter(t)});return this.layoutItems(e,!0),this.reveal(e),t},d.prototype.insert=function(t){var e=this.addItems(t);if(e.length){var i,o,n=e.length;for(i=0;n>i;i++)o=e[i],this.element.appendChild(o.element);var r=this._filter(e);for(this._noTransition(function(){this.hide(r)}),i=0;n>i;i++)e[i].isLayoutInstant=!0;for(this.arrange(),i=0;n>i;i++)delete e[i].isLayoutInstant;this.reveal(r)}};var c=d.prototype.remove;return d.prototype.remove=function(t){t=o(t);var e=this.getItems(t);if(c.call(this,t),e&&e.length)for(var i=0,r=e.length;r>i;i++){var s=e[i];n(s,this.filteredItems)}},d.prototype.shuffle=function(){for(var t=0,e=this.items.length;e>t;t++){var i=this.items[t];i.sortData.random=Math.random()}this.options.sortBy="random",this._sort(),this._layout()},d.prototype._noTransition=function(t){var e=this.options.transitionDuration;this.options.transitionDuration=0;var i=t.call(this);return this.options.transitionDuration=e,i},d.prototype.getFilteredItemElements=function(){for(var t=[],e=0,i=this.filteredItems.length;i>e;e++)t.push(this.filteredItems[e].element);return t},d}var s=t.jQuery,a=String.prototype.trim?function(t){return t.trim()}:function(t){return t.replace(/^\s+|\s+$/g,"")},u=document.documentElement,p=u.textContent?function(t){return t.textContent}:function(t){return t.innerText},h=Object.prototype.toString,f=Array.prototype.indexOf?function(t,e){return t.indexOf(e)}:function(t,e){for(var i=0,o=t.length;o>i;i++)if(t[i]===e)return i;return-1};"function"==typeof define&&define.amd?define(["outlayer/outlayer","get-size/get-size","matches-selector/matches-selector","isotope/js/item","isotope/js/layout-mode","isotope/js/layout-modes/masonry","isotope/js/layout-modes/fit-rows","isotope/js/layout-modes/vertical"],r):t.Isotope=r(t.Outlayer,t.getSize,t.matchesSelector,t.Isotope.Item,t.Isotope.LayoutMode)}(window);
/*! fancyBox v2.1.5 fancyapps.com | fancyapps.com/fancybox/#license */
(function(r,G,f,v){var J=f("html"),n=f(r),p=f(G),b=f.fancybox=function(){b.open.apply(this,arguments)},I=navigator.userAgent.match(/msie/i),B=null,s=G.createTouch!==v,t=function(a){return a&&a.hasOwnProperty&&a instanceof f},q=function(a){return a&&"string"===f.type(a)},E=function(a){return q(a)&&0<a.indexOf("%")},l=function(a,d){var e=parseInt(a,10)||0;d&&E(a)&&(e*=b.getViewport()[d]/100);return Math.ceil(e)},w=function(a,b){return l(a,b)+"px"};f.extend(b,{version:"2.1.5",defaults:{padding:15,margin:20,
width:800,height:600,minWidth:100,minHeight:100,maxWidth:9999,maxHeight:9999,pixelRatio:1,autoSize:!0,autoHeight:!1,autoWidth:!1,autoResize:!0,autoCenter:!s,fitToView:!0,aspectRatio:!1,topRatio:0.5,leftRatio:0.5,scrolling:"auto",wrapCSS:"",arrows:!0,closeBtn:!0,closeClick:!1,nextClick:!1,mouseWheel:!0,autoPlay:!1,playSpeed:3E3,preload:3,modal:!1,loop:!0,ajax:{dataType:"html",headers:{"X-fancyBox":!0}},iframe:{scrolling:"auto",preload:!0},swf:{wmode:"transparent",allowfullscreen:"true",allowscriptaccess:"always"},
keys:{next:{13:"left",34:"up",39:"left",40:"up"},prev:{8:"right",33:"down",37:"right",38:"down"},close:[27],play:[32],toggle:[70]},direction:{next:"left",prev:"right"},scrollOutside:!0,index:0,type:null,href:null,content:null,title:null,tpl:{wrap:'<div class="fancybox-wrap" tabIndex="-1"><div class="fancybox-skin"><div class="fancybox-outer"><div class="fancybox-inner"></div></div></div></div>',image:'<img class="fancybox-image" src="{href}" alt="" />',iframe:'<iframe id="fancybox-frame{rnd}" name="fancybox-frame{rnd}" class="fancybox-iframe" frameborder="0" vspace="0" hspace="0" webkitAllowFullScreen mozallowfullscreen allowFullScreen'+
(I?' allowtransparency="true"':"")+"></iframe>",error:'<p class="fancybox-error">The requested content cannot be loaded.<br/>Please try again later.</p>',closeBtn:'<a title="Close" class="fancybox-item fancybox-close" href="javascript:;"></a>',next:'<a title="Next" class="fancybox-nav fancybox-next" href="javascript:;"><span></span></a>',prev:'<a title="Previous" class="fancybox-nav fancybox-prev" href="javascript:;"><span></span></a>'},openEffect:"fade",openSpeed:250,openEasing:"swing",openOpacity:!0,
openMethod:"zoomIn",closeEffect:"fade",closeSpeed:250,closeEasing:"swing",closeOpacity:!0,closeMethod:"zoomOut",nextEffect:"elastic",nextSpeed:250,nextEasing:"swing",nextMethod:"changeIn",prevEffect:"elastic",prevSpeed:250,prevEasing:"swing",prevMethod:"changeOut",helpers:{overlay:!0,title:!0},onCancel:f.noop,beforeLoad:f.noop,afterLoad:f.noop,beforeShow:f.noop,afterShow:f.noop,beforeChange:f.noop,beforeClose:f.noop,afterClose:f.noop},group:{},opts:{},previous:null,coming:null,current:null,isActive:!1,
isOpen:!1,isOpened:!1,wrap:null,skin:null,outer:null,inner:null,player:{timer:null,isActive:!1},ajaxLoad:null,imgPreload:null,transitions:{},helpers:{},open:function(a,d){if(a&&(f.isPlainObject(d)||(d={}),!1!==b.close(!0)))return f.isArray(a)||(a=t(a)?f(a).get():[a]),f.each(a,function(e,c){var k={},g,h,j,m,l;"object"===f.type(c)&&(c.nodeType&&(c=f(c)),t(c)?(k={href:c.data("fancybox-href")||c.attr("href"),title:c.data("fancybox-title")||c.attr("title"),isDom:!0,element:c},f.metadata&&f.extend(!0,k,
c.metadata())):k=c);g=d.href||k.href||(q(c)?c:null);h=d.title!==v?d.title:k.title||"";m=(j=d.content||k.content)?"html":d.type||k.type;!m&&k.isDom&&(m=c.data("fancybox-type"),m||(m=(m=c.prop("class").match(/fancybox\.(\w+)/))?m[1]:null));q(g)&&(m||(b.isImage(g)?m="image":b.isSWF(g)?m="swf":"#"===g.charAt(0)?m="inline":q(c)&&(m="html",j=c)),"ajax"===m&&(l=g.split(/\s+/,2),g=l.shift(),l=l.shift()));j||("inline"===m?g?j=f(q(g)?g.replace(/.*(?=#[^\s]+$)/,""):g):k.isDom&&(j=c):"html"===m?j=g:!m&&(!g&&
k.isDom)&&(m="inline",j=c));f.extend(k,{href:g,type:m,content:j,title:h,selector:l});a[e]=k}),b.opts=f.extend(!0,{},b.defaults,d),d.keys!==v&&(b.opts.keys=d.keys?f.extend({},b.defaults.keys,d.keys):!1),b.group=a,b._start(b.opts.index)},cancel:function(){var a=b.coming;a&&!1!==b.trigger("onCancel")&&(b.hideLoading(),b.ajaxLoad&&b.ajaxLoad.abort(),b.ajaxLoad=null,b.imgPreload&&(b.imgPreload.onload=b.imgPreload.onerror=null),a.wrap&&a.wrap.stop(!0,!0).trigger("onReset").remove(),b.coming=null,b.current||
b._afterZoomOut(a))},close:function(a){b.cancel();!1!==b.trigger("beforeClose")&&(b.unbindEvents(),b.isActive&&(!b.isOpen||!0===a?(f(".fancybox-wrap").stop(!0).trigger("onReset").remove(),b._afterZoomOut()):(b.isOpen=b.isOpened=!1,b.isClosing=!0,f(".fancybox-item, .fancybox-nav").remove(),b.wrap.stop(!0,!0).removeClass("fancybox-opened"),b.transitions[b.current.closeMethod]())))},play:function(a){var d=function(){clearTimeout(b.player.timer)},e=function(){d();b.current&&b.player.isActive&&(b.player.timer=
setTimeout(b.next,b.current.playSpeed))},c=function(){d();p.unbind(".player");b.player.isActive=!1;b.trigger("onPlayEnd")};if(!0===a||!b.player.isActive&&!1!==a){if(b.current&&(b.current.loop||b.current.index<b.group.length-1))b.player.isActive=!0,p.bind({"onCancel.player beforeClose.player":c,"onUpdate.player":e,"beforeLoad.player":d}),e(),b.trigger("onPlayStart")}else c()},next:function(a){var d=b.current;d&&(q(a)||(a=d.direction.next),b.jumpto(d.index+1,a,"next"))},prev:function(a){var d=b.current;
d&&(q(a)||(a=d.direction.prev),b.jumpto(d.index-1,a,"prev"))},jumpto:function(a,d,e){var c=b.current;c&&(a=l(a),b.direction=d||c.direction[a>=c.index?"next":"prev"],b.router=e||"jumpto",c.loop&&(0>a&&(a=c.group.length+a%c.group.length),a%=c.group.length),c.group[a]!==v&&(b.cancel(),b._start(a)))},reposition:function(a,d){var e=b.current,c=e?e.wrap:null,k;c&&(k=b._getPosition(d),a&&"scroll"===a.type?(delete k.position,c.stop(!0,!0).animate(k,200)):(c.css(k),e.pos=f.extend({},e.dim,k)))},update:function(a){var d=
a&&a.type,e=!d||"orientationchange"===d;e&&(clearTimeout(B),B=null);b.isOpen&&!B&&(B=setTimeout(function(){var c=b.current;c&&!b.isClosing&&(b.wrap.removeClass("fancybox-tmp"),(e||"load"===d||"resize"===d&&c.autoResize)&&b._setDimension(),"scroll"===d&&c.canShrink||b.reposition(a),b.trigger("onUpdate"),B=null)},e&&!s?0:300))},toggle:function(a){b.isOpen&&(b.current.fitToView="boolean"===f.type(a)?a:!b.current.fitToView,s&&(b.wrap.removeAttr("style").addClass("fancybox-tmp"),b.trigger("onUpdate")),
b.update())},hideLoading:function(){p.unbind(".loading");f("#fancybox-loading").remove()},showLoading:function(){var a,d;b.hideLoading();a=f('<div id="fancybox-loading"><div></div></div>').click(b.cancel).appendTo("body");p.bind("keydown.loading",function(a){if(27===(a.which||a.keyCode))a.preventDefault(),b.cancel()});b.defaults.fixed||(d=b.getViewport(),a.css({position:"absolute",top:0.5*d.h+d.y,left:0.5*d.w+d.x}))},getViewport:function(){var a=b.current&&b.current.locked||!1,d={x:n.scrollLeft(),
y:n.scrollTop()};a?(d.w=a[0].clientWidth,d.h=a[0].clientHeight):(d.w=s&&r.innerWidth?r.innerWidth:n.width(),d.h=s&&r.innerHeight?r.innerHeight:n.height());return d},unbindEvents:function(){b.wrap&&t(b.wrap)&&b.wrap.unbind(".fb");p.unbind(".fb");n.unbind(".fb")},bindEvents:function(){var a=b.current,d;a&&(n.bind("orientationchange.fb"+(s?"":" resize.fb")+(a.autoCenter&&!a.locked?" scroll.fb":""),b.update),(d=a.keys)&&p.bind("keydown.fb",function(e){var c=e.which||e.keyCode,k=e.target||e.srcElement;
if(27===c&&b.coming)return!1;!e.ctrlKey&&(!e.altKey&&!e.shiftKey&&!e.metaKey&&(!k||!k.type&&!f(k).is("[contenteditable]")))&&f.each(d,function(d,k){if(1<a.group.length&&k[c]!==v)return b[d](k[c]),e.preventDefault(),!1;if(-1<f.inArray(c,k))return b[d](),e.preventDefault(),!1})}),f.fn.mousewheel&&a.mouseWheel&&b.wrap.bind("mousewheel.fb",function(d,c,k,g){for(var h=f(d.target||null),j=!1;h.length&&!j&&!h.is(".fancybox-skin")&&!h.is(".fancybox-wrap");)j=h[0]&&!(h[0].style.overflow&&"hidden"===h[0].style.overflow)&&
(h[0].clientWidth&&h[0].scrollWidth>h[0].clientWidth||h[0].clientHeight&&h[0].scrollHeight>h[0].clientHeight),h=f(h).parent();if(0!==c&&!j&&1<b.group.length&&!a.canShrink){if(0<g||0<k)b.prev(0<g?"down":"left");else if(0>g||0>k)b.next(0>g?"up":"right");d.preventDefault()}}))},trigger:function(a,d){var e,c=d||b.coming||b.current;if(c){f.isFunction(c[a])&&(e=c[a].apply(c,Array.prototype.slice.call(arguments,1)));if(!1===e)return!1;c.helpers&&f.each(c.helpers,function(d,e){if(e&&b.helpers[d]&&f.isFunction(b.helpers[d][a]))b.helpers[d][a](f.extend(!0,
{},b.helpers[d].defaults,e),c)});p.trigger(a)}},isImage:function(a){return q(a)&&a.match(/(^data:image\/.*,)|(\.(jp(e|g|eg)|gif|png|bmp|webp|svg)((\?|#).*)?$)/i)},isSWF:function(a){return q(a)&&a.match(/\.(swf)((\?|#).*)?$/i)},_start:function(a){var d={},e,c;a=l(a);e=b.group[a]||null;if(!e)return!1;d=f.extend(!0,{},b.opts,e);e=d.margin;c=d.padding;"number"===f.type(e)&&(d.margin=[e,e,e,e]);"number"===f.type(c)&&(d.padding=[c,c,c,c]);d.modal&&f.extend(!0,d,{closeBtn:!1,closeClick:!1,nextClick:!1,arrows:!1,
mouseWheel:!1,keys:null,helpers:{overlay:{closeClick:!1}}});d.autoSize&&(d.autoWidth=d.autoHeight=!0);"auto"===d.width&&(d.autoWidth=!0);"auto"===d.height&&(d.autoHeight=!0);d.group=b.group;d.index=a;b.coming=d;if(!1===b.trigger("beforeLoad"))b.coming=null;else{c=d.type;e=d.href;if(!c)return b.coming=null,b.current&&b.router&&"jumpto"!==b.router?(b.current.index=a,b[b.router](b.direction)):!1;b.isActive=!0;if("image"===c||"swf"===c)d.autoHeight=d.autoWidth=!1,d.scrolling="visible";"image"===c&&(d.aspectRatio=
!0);"iframe"===c&&s&&(d.scrolling="scroll");d.wrap=f(d.tpl.wrap).addClass("fancybox-"+(s?"mobile":"desktop")+" fancybox-type-"+c+" fancybox-tmp "+d.wrapCSS).appendTo(d.parent||"body");f.extend(d,{skin:f(".fancybox-skin",d.wrap),outer:f(".fancybox-outer",d.wrap),inner:f(".fancybox-inner",d.wrap)});f.each(["Top","Right","Bottom","Left"],function(a,b){d.skin.css("padding"+b,w(d.padding[a]))});b.trigger("onReady");if("inline"===c||"html"===c){if(!d.content||!d.content.length)return b._error("content")}else if(!e)return b._error("href");
"image"===c?b._loadImage():"ajax"===c?b._loadAjax():"iframe"===c?b._loadIframe():b._afterLoad()}},_error:function(a){f.extend(b.coming,{type:"html",autoWidth:!0,autoHeight:!0,minWidth:0,minHeight:0,scrolling:"no",hasError:a,content:b.coming.tpl.error});b._afterLoad()},_loadImage:function(){var a=b.imgPreload=new Image;a.onload=function(){this.onload=this.onerror=null;b.coming.width=this.width/b.opts.pixelRatio;b.coming.height=this.height/b.opts.pixelRatio;b._afterLoad()};a.onerror=function(){this.onload=
this.onerror=null;b._error("image")};a.src=b.coming.href;!0!==a.complete&&b.showLoading()},_loadAjax:function(){var a=b.coming;b.showLoading();b.ajaxLoad=f.ajax(f.extend({},a.ajax,{url:a.href,error:function(a,e){b.coming&&"abort"!==e?b._error("ajax",a):b.hideLoading()},success:function(d,e){"success"===e&&(a.content=d,b._afterLoad())}}))},_loadIframe:function(){var a=b.coming,d=f(a.tpl.iframe.replace(/\{rnd\}/g,(new Date).getTime())).attr("scrolling",s?"auto":a.iframe.scrolling).attr("src",a.href);
f(a.wrap).bind("onReset",function(){try{f(this).find("iframe").hide().attr("src","//about:blank").end().empty()}catch(a){}});a.iframe.preload&&(b.showLoading(),d.one("load",function(){f(this).data("ready",1);s||f(this).bind("load.fb",b.update);f(this).parents(".fancybox-wrap").width("100%").removeClass("fancybox-tmp").show();b._afterLoad()}));a.content=d.appendTo(a.inner);a.iframe.preload||b._afterLoad()},_preloadImages:function(){var a=b.group,d=b.current,e=a.length,c=d.preload?Math.min(d.preload,
e-1):0,f,g;for(g=1;g<=c;g+=1)f=a[(d.index+g)%e],"image"===f.type&&f.href&&((new Image).src=f.href)},_afterLoad:function(){var a=b.coming,d=b.current,e,c,k,g,h;b.hideLoading();if(a&&!1!==b.isActive)if(!1===b.trigger("afterLoad",a,d))a.wrap.stop(!0).trigger("onReset").remove(),b.coming=null;else{d&&(b.trigger("beforeChange",d),d.wrap.stop(!0).removeClass("fancybox-opened").find(".fancybox-item, .fancybox-nav").remove());b.unbindEvents();e=a.content;c=a.type;k=a.scrolling;f.extend(b,{wrap:a.wrap,skin:a.skin,
outer:a.outer,inner:a.inner,current:a,previous:d});g=a.href;switch(c){case "inline":case "ajax":case "html":a.selector?e=f("<div>").html(e).find(a.selector):t(e)&&(e.data("fancybox-placeholder")||e.data("fancybox-placeholder",f('<div class="fancybox-placeholder"></div>').insertAfter(e).hide()),e=e.show().detach(),a.wrap.bind("onReset",function(){f(this).find(e).length&&e.hide().replaceAll(e.data("fancybox-placeholder")).data("fancybox-placeholder",!1)}));break;case "image":e=a.tpl.image.replace("{href}",
g);break;case "swf":e='<object id="fancybox-swf" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="100%" height="100%"><param name="movie" value="'+g+'"></param>',h="",f.each(a.swf,function(a,b){e+='<param name="'+a+'" value="'+b+'"></param>';h+=" "+a+'="'+b+'"'}),e+='<embed src="'+g+'" type="application/x-shockwave-flash" width="100%" height="100%"'+h+"></embed></object>"}(!t(e)||!e.parent().is(a.inner))&&a.inner.append(e);b.trigger("beforeShow");a.inner.css("overflow","yes"===k?"scroll":
"no"===k?"hidden":k);b._setDimension();b.reposition();b.isOpen=!1;b.coming=null;b.bindEvents();if(b.isOpened){if(d.prevMethod)b.transitions[d.prevMethod]()}else f(".fancybox-wrap").not(a.wrap).stop(!0).trigger("onReset").remove();b.transitions[b.isOpened?a.nextMethod:a.openMethod]();b._preloadImages()}},_setDimension:function(){var a=b.getViewport(),d=0,e=!1,c=!1,e=b.wrap,k=b.skin,g=b.inner,h=b.current,c=h.width,j=h.height,m=h.minWidth,u=h.minHeight,n=h.maxWidth,p=h.maxHeight,s=h.scrolling,q=h.scrollOutside?
h.scrollbarWidth:0,x=h.margin,y=l(x[1]+x[3]),r=l(x[0]+x[2]),v,z,t,C,A,F,B,D,H;e.add(k).add(g).width("auto").height("auto").removeClass("fancybox-tmp");x=l(k.outerWidth(!0)-k.width());v=l(k.outerHeight(!0)-k.height());z=y+x;t=r+v;C=E(c)?(a.w-z)*l(c)/100:c;A=E(j)?(a.h-t)*l(j)/100:j;if("iframe"===h.type){if(H=h.content,h.autoHeight&&1===H.data("ready"))try{H[0].contentWindow.document.location&&(g.width(C).height(9999),F=H.contents().find("body"),q&&F.css("overflow-x","hidden"),A=F.outerHeight(!0))}catch(G){}}else if(h.autoWidth||
h.autoHeight)g.addClass("fancybox-tmp"),h.autoWidth||g.width(C),h.autoHeight||g.height(A),h.autoWidth&&(C=g.width()),h.autoHeight&&(A=g.height()),g.removeClass("fancybox-tmp");c=l(C);j=l(A);D=C/A;m=l(E(m)?l(m,"w")-z:m);n=l(E(n)?l(n,"w")-z:n);u=l(E(u)?l(u,"h")-t:u);p=l(E(p)?l(p,"h")-t:p);F=n;B=p;h.fitToView&&(n=Math.min(a.w-z,n),p=Math.min(a.h-t,p));z=a.w-y;r=a.h-r;h.aspectRatio?(c>n&&(c=n,j=l(c/D)),j>p&&(j=p,c=l(j*D)),c<m&&(c=m,j=l(c/D)),j<u&&(j=u,c=l(j*D))):(c=Math.max(m,Math.min(c,n)),h.autoHeight&&
"iframe"!==h.type&&(g.width(c),j=g.height()),j=Math.max(u,Math.min(j,p)));if(h.fitToView)if(g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height(),h.aspectRatio)for(;(a>z||y>r)&&(c>m&&j>u)&&!(19<d++);)j=Math.max(u,Math.min(p,j-10)),c=l(j*D),c<m&&(c=m,j=l(c/D)),c>n&&(c=n,j=l(c/D)),g.width(c).height(j),e.width(c+x),a=e.width(),y=e.height();else c=Math.max(m,Math.min(c,c-(a-z))),j=Math.max(u,Math.min(j,j-(y-r)));q&&("auto"===s&&j<A&&c+x+q<z)&&(c+=q);g.width(c).height(j);e.width(c+x);a=e.width();
y=e.height();e=(a>z||y>r)&&c>m&&j>u;c=h.aspectRatio?c<F&&j<B&&c<C&&j<A:(c<F||j<B)&&(c<C||j<A);f.extend(h,{dim:{width:w(a),height:w(y)},origWidth:C,origHeight:A,canShrink:e,canExpand:c,wPadding:x,hPadding:v,wrapSpace:y-k.outerHeight(!0),skinSpace:k.height()-j});!H&&(h.autoHeight&&j>u&&j<p&&!c)&&g.height("auto")},_getPosition:function(a){var d=b.current,e=b.getViewport(),c=d.margin,f=b.wrap.width()+c[1]+c[3],g=b.wrap.height()+c[0]+c[2],c={position:"absolute",top:c[0],left:c[3]};d.autoCenter&&d.fixed&&
!a&&g<=e.h&&f<=e.w?c.position="fixed":d.locked||(c.top+=e.y,c.left+=e.x);c.top=w(Math.max(c.top,c.top+(e.h-g)*d.topRatio));c.left=w(Math.max(c.left,c.left+(e.w-f)*d.leftRatio));return c},_afterZoomIn:function(){var a=b.current;a&&(b.isOpen=b.isOpened=!0,b.wrap.css("overflow","visible").addClass("fancybox-opened"),b.update(),(a.closeClick||a.nextClick&&1<b.group.length)&&b.inner.css("cursor","pointer").bind("click.fb",function(d){!f(d.target).is("a")&&!f(d.target).parent().is("a")&&(d.preventDefault(),
b[a.closeClick?"close":"next"]())}),a.closeBtn&&f(a.tpl.closeBtn).appendTo(b.skin).bind("click.fb",function(a){a.preventDefault();b.close()}),a.arrows&&1<b.group.length&&((a.loop||0<a.index)&&f(a.tpl.prev).appendTo(b.outer).bind("click.fb",b.prev),(a.loop||a.index<b.group.length-1)&&f(a.tpl.next).appendTo(b.outer).bind("click.fb",b.next)),b.trigger("afterShow"),!a.loop&&a.index===a.group.length-1?b.play(!1):b.opts.autoPlay&&!b.player.isActive&&(b.opts.autoPlay=!1,b.play()))},_afterZoomOut:function(a){a=
a||b.current;f(".fancybox-wrap").trigger("onReset").remove();f.extend(b,{group:{},opts:{},router:!1,current:null,isActive:!1,isOpened:!1,isOpen:!1,isClosing:!1,wrap:null,skin:null,outer:null,inner:null});b.trigger("afterClose",a)}});b.transitions={getOrigPosition:function(){var a=b.current,d=a.element,e=a.orig,c={},f=50,g=50,h=a.hPadding,j=a.wPadding,m=b.getViewport();!e&&(a.isDom&&d.is(":visible"))&&(e=d.find("img:first"),e.length||(e=d));t(e)?(c=e.offset(),e.is("img")&&(f=e.outerWidth(),g=e.outerHeight())):
(c.top=m.y+(m.h-g)*a.topRatio,c.left=m.x+(m.w-f)*a.leftRatio);if("fixed"===b.wrap.css("position")||a.locked)c.top-=m.y,c.left-=m.x;return c={top:w(c.top-h*a.topRatio),left:w(c.left-j*a.leftRatio),width:w(f+j),height:w(g+h)}},step:function(a,d){var e,c,f=d.prop;c=b.current;var g=c.wrapSpace,h=c.skinSpace;if("width"===f||"height"===f)e=d.end===d.start?1:(a-d.start)/(d.end-d.start),b.isClosing&&(e=1-e),c="width"===f?c.wPadding:c.hPadding,c=a-c,b.skin[f](l("width"===f?c:c-g*e)),b.inner[f](l("width"===
f?c:c-g*e-h*e))},zoomIn:function(){var a=b.current,d=a.pos,e=a.openEffect,c="elastic"===e,k=f.extend({opacity:1},d);delete k.position;c?(d=this.getOrigPosition(),a.openOpacity&&(d.opacity=0.1)):"fade"===e&&(d.opacity=0.1);b.wrap.css(d).animate(k,{duration:"none"===e?0:a.openSpeed,easing:a.openEasing,step:c?this.step:null,complete:b._afterZoomIn})},zoomOut:function(){var a=b.current,d=a.closeEffect,e="elastic"===d,c={opacity:0.1};e&&(c=this.getOrigPosition(),a.closeOpacity&&(c.opacity=0.1));b.wrap.animate(c,
{duration:"none"===d?0:a.closeSpeed,easing:a.closeEasing,step:e?this.step:null,complete:b._afterZoomOut})},changeIn:function(){var a=b.current,d=a.nextEffect,e=a.pos,c={opacity:1},f=b.direction,g;e.opacity=0.1;"elastic"===d&&(g="down"===f||"up"===f?"top":"left","down"===f||"right"===f?(e[g]=w(l(e[g])-200),c[g]="+=200px"):(e[g]=w(l(e[g])+200),c[g]="-=200px"));"none"===d?b._afterZoomIn():b.wrap.css(e).animate(c,{duration:a.nextSpeed,easing:a.nextEasing,complete:b._afterZoomIn})},changeOut:function(){var a=
b.previous,d=a.prevEffect,e={opacity:0.1},c=b.direction;"elastic"===d&&(e["down"===c||"up"===c?"top":"left"]=("up"===c||"left"===c?"-":"+")+"=200px");a.wrap.animate(e,{duration:"none"===d?0:a.prevSpeed,easing:a.prevEasing,complete:function(){f(this).trigger("onReset").remove()}})}};b.helpers.overlay={defaults:{closeClick:!0,speedOut:200,showEarly:!0,css:{},locked:!s,fixed:!0},overlay:null,fixed:!1,el:f("html"),create:function(a){a=f.extend({},this.defaults,a);this.overlay&&this.close();this.overlay=
f('<div class="fancybox-overlay"></div>').appendTo(b.coming?b.coming.parent:a.parent);this.fixed=!1;a.fixed&&b.defaults.fixed&&(this.overlay.addClass("fancybox-overlay-fixed"),this.fixed=!0)},open:function(a){var d=this;a=f.extend({},this.defaults,a);this.overlay?this.overlay.unbind(".overlay").width("auto").height("auto"):this.create(a);this.fixed||(n.bind("resize.overlay",f.proxy(this.update,this)),this.update());a.closeClick&&this.overlay.bind("click.overlay",function(a){if(f(a.target).hasClass("fancybox-overlay"))return b.isActive?
b.close():d.close(),!1});this.overlay.css(a.css).show()},close:function(){var a,b;n.unbind("resize.overlay");this.el.hasClass("fancybox-lock")&&(f(".fancybox-margin").removeClass("fancybox-margin"),a=n.scrollTop(),b=n.scrollLeft(),this.el.removeClass("fancybox-lock"),n.scrollTop(a).scrollLeft(b));f(".fancybox-overlay").remove().hide();f.extend(this,{overlay:null,fixed:!1})},update:function(){var a="100%",b;this.overlay.width(a).height("100%");I?(b=Math.max(G.documentElement.offsetWidth,G.body.offsetWidth),
p.width()>b&&(a=p.width())):p.width()>n.width()&&(a=p.width());this.overlay.width(a).height(p.height())},onReady:function(a,b){var e=this.overlay;f(".fancybox-overlay").stop(!0,!0);e||this.create(a);a.locked&&(this.fixed&&b.fixed)&&(e||(this.margin=p.height()>n.height()?f("html").css("margin-right").replace("px",""):!1),b.locked=this.overlay.append(b.wrap),b.fixed=!1);!0===a.showEarly&&this.beforeShow.apply(this,arguments)},beforeShow:function(a,b){var e,c;b.locked&&(!1!==this.margin&&(f("*").filter(function(){return"fixed"===
f(this).css("position")&&!f(this).hasClass("fancybox-overlay")&&!f(this).hasClass("fancybox-wrap")}).addClass("fancybox-margin"),this.el.addClass("fancybox-margin")),e=n.scrollTop(),c=n.scrollLeft(),this.el.addClass("fancybox-lock"),n.scrollTop(e).scrollLeft(c));this.open(a)},onUpdate:function(){this.fixed||this.update()},afterClose:function(a){this.overlay&&!b.coming&&this.overlay.fadeOut(a.speedOut,f.proxy(this.close,this))}};b.helpers.title={defaults:{type:"float",position:"bottom"},beforeShow:function(a){var d=
b.current,e=d.title,c=a.type;f.isFunction(e)&&(e=e.call(d.element,d));if(q(e)&&""!==f.trim(e)){d=f('<div class="fancybox-title fancybox-title-'+c+'-wrap">'+e+"</div>");switch(c){case "inside":c=b.skin;break;case "outside":c=b.wrap;break;case "over":c=b.inner;break;default:c=b.skin,d.appendTo("body"),I&&d.width(d.width()),d.wrapInner('<span class="child"></span>'),b.current.margin[2]+=Math.abs(l(d.css("margin-bottom")))}d["top"===a.position?"prependTo":"appendTo"](c)}}};f.fn.fancybox=function(a){var d,
e=f(this),c=this.selector||"",k=function(g){var h=f(this).blur(),j=d,k,l;!g.ctrlKey&&(!g.altKey&&!g.shiftKey&&!g.metaKey)&&!h.is(".fancybox-wrap")&&(k=a.groupAttr||"data-fancybox-group",l=h.attr(k),l||(k="rel",l=h.get(0)[k]),l&&(""!==l&&"nofollow"!==l)&&(h=c.length?f(c):e,h=h.filter("["+k+'="'+l+'"]'),j=h.index(this)),a.index=j,!1!==b.open(h,a)&&g.preventDefault())};a=a||{};d=a.index||0;!c||!1===a.live?e.unbind("click.fb-start").bind("click.fb-start",k):p.undelegate(c,"click.fb-start").delegate(c+
":not('.fancybox-item, .fancybox-nav')","click.fb-start",k);this.filter("[data-fancybox-start=1]").trigger("click");return this};p.ready(function(){var a,d;f.scrollbarWidth===v&&(f.scrollbarWidth=function(){var a=f('<div style="width:50px;height:50px;overflow:auto"><div/></div>').appendTo("body"),b=a.children(),b=b.innerWidth()-b.height(99).innerWidth();a.remove();return b});if(f.support.fixedPosition===v){a=f.support;d=f('<div style="position:fixed;top:20px;"></div>').appendTo("body");var e=20===
d[0].offsetTop||15===d[0].offsetTop;d.remove();a.fixedPosition=e}f.extend(b.defaults,{scrollbarWidth:f.scrollbarWidth(),fixed:f.support.fixedPosition,parent:f("body")});a=f(r).width();J.addClass("fancybox-lock-test");d=f(r).width();J.removeClass("fancybox-lock-test");f("<style type='text/css'>.fancybox-margin{margin-right:"+(d-a)+"px;}</style>").appendTo("head")})})(window,document,jQuery);
/*********************************************************************
*  #### Twitter Post Fetcher v17.0.2 ####
*  Coded by Jason Mayes 2015. A present to all the developers out there.
*  www.jasonmayes.com
*  Please keep this disclaimer with my code if you use it. Thanks. :-)
*  Got feedback or questions, ask here:
*  http://www.jasonmayes.com/projects/twitterApi/
*  Github: https://github.com/jasonmayes/Twitter-Post-Fetcher
*  Updates will be posted to this site.
*********************************************************************/
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory);
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory();
  } else {
    // Browser globals.
    factory();
  }
})(this, function() {
  var domNode = '';
  var maxTweets = 20;
  var parseLinks = true;
  var queue = [];
  var inProgress = false;
  var printTime = true;
  var printUser = true;
  var formatterFunction = null;
  var supportsClassName = true;
  var showRts = true;
  var customCallbackFunction = null;
  var showInteractionLinks = true;
  var showImages = false;
  var useEmoji = false;
  var targetBlank = true;
  var lang = 'en';
  var permalinks = true;
  var dataOnly = false;
  var script = null;
  var scriptAdded = false;

  function handleTweets(tweets) {
    if (customCallbackFunction === null) {
      var x = tweets.length;
      var n = 0;
      var element = document.getElementById(domNode);
      var html = '<ul>';
      while (n < x) {
        html += '<li>' + tweets[n] + '</li>';
        n++;
      }
      html += '</ul>';
      element.innerHTML = html;
    } else {
      customCallbackFunction(tweets);
    }
  }

  function strip(data) {
    return data
      .replace(/<b[^>]*>(.*?)<\/b>/gi, function(a, s) {
        return s;
      })
      .replace(
        /class="(?!(tco-hidden|tco-display|tco-ellipsis))+.*?"|data-query-source=".*?"|dir=".*?"|rel=".*?"/gi,
        ''
      );
  }

  function targetLinksToNewWindow(el) {
    var links = el.getElementsByTagName('a');
    for (var i = links.length - 1; i >= 0; i--) {
      links[i].setAttribute('target', '_blank');
    }
  }

  function getElementsByClassName(node, classname) {
    var a = [];
    var regex = new RegExp('(^| )' + classname + '( |$)');
    var elems = node.getElementsByTagName('*');
    for (var i = 0, j = elems.length; i < j; i++) {
      if (regex.test(elems[i].className)) {
        a.push(elems[i]);
      }
    }
    return a;
  }

  function extractImageUrl(image_data) {
    if (
      image_data !== undefined &&
      image_data.innerHTML.indexOf('data-srcset') >= 0
    ) {
      var data_src = image_data.innerHTML.match(
        /data-srcset="([A-z0-9%_\.-]+)/i
      )[0];
      return decodeURIComponent(data_src).split('"')[1];
    }
  }

  var twitterFetcher = {
    fetch: function(config) {
      if (config.maxTweets === undefined) {
        config.maxTweets = 20;
      }
      if (config.enableLinks === undefined) {
        config.enableLinks = true;
      }
      if (config.showUser === undefined) {
        config.showUser = true;
      }
      if (config.showTime === undefined) {
        config.showTime = true;
      }
      if (config.dateFunction === undefined) {
        config.dateFunction = 'default';
      }
      if (config.showRetweet === undefined) {
        config.showRetweet = true;
      }
      if (config.customCallback === undefined) {
        config.customCallback = null;
      }
      if (config.showInteraction === undefined) {
        config.showInteraction = true;
      }
      if (config.showImages === undefined) {
        config.showImages = false;
      }
      if (config.useEmoji === undefined) {
        config.useEmoji = false;
      }
      if (config.linksInNewWindow === undefined) {
        config.linksInNewWindow = true;
      }
      if (config.showPermalinks === undefined) {
        config.showPermalinks = true;
      }
      if (config.dataOnly === undefined) {
        config.dataOnly = false;
      }

      if (inProgress) {
        queue.push(config);
      } else {
        inProgress = true;

        domNode = config.domId;
        maxTweets = config.maxTweets;
        parseLinks = config.enableLinks;
        printUser = config.showUser;
        printTime = config.showTime;
        showRts = config.showRetweet;
        formatterFunction = config.dateFunction;
        customCallbackFunction = config.customCallback;
        showInteractionLinks = config.showInteraction;
        showImages = config.showImages;
        useEmoji = config.useEmoji;
        targetBlank = config.linksInNewWindow;
        permalinks = config.showPermalinks;
        dataOnly = config.dataOnly;

        var head = document.getElementsByTagName('head')[0];
        if (script !== null) {
          head.removeChild(script);
        }
        script = document.createElement('script');
        script.type = 'text/javascript';
        if (config.list !== undefined) {
          script.src =
            'https://syndication.twitter.com/timeline/list?' +
            'callback=__twttrf.callback&dnt=false&list_slug=' +
            config.list.listSlug +
            '&screen_name=' +
            config.list.screenName +
            '&suppress_response_codes=true&lang=' +
            (config.lang || lang) +
            '&rnd=' +
            Math.random();
        } else if (config.profile !== undefined) {
          script.src =
            'https://syndication.twitter.com/timeline/profile?' +
            'callback=__twttrf.callback&dnt=false' +
            '&screen_name=' +
            config.profile.screenName +
            '&suppress_response_codes=true&lang=' +
            (config.lang || lang) +
            '&rnd=' +
            Math.random();
        } else if (config.likes !== undefined) {
          script.src =
            'https://syndication.twitter.com/timeline/likes?' +
            'callback=__twttrf.callback&dnt=false' +
            '&screen_name=' +
            config.likes.screenName +
            '&suppress_response_codes=true&lang=' +
            (config.lang || lang) +
            '&rnd=' +
            Math.random();
        } else {
          script.src =
            'https://cdn.syndication.twimg.com/widgets/timelines/' +
            config.id +
            '?&lang=' +
            (config.lang || lang) +
            '&callback=__twttrf.callback&' +
            'suppress_response_codes=true&rnd=' +
            Math.random();
        }
        head.appendChild(script);
      }
    },
    callback: function(data) {
      if (data === undefined || data.body === undefined) {
        inProgress = false;

        if (queue.length > 0) {
          twitterFetcher.fetch(queue[0]);
          queue.splice(0, 1);
        }
        return;
      }

      // Remove emoji and summary card images.
      if (!useEmoji) {
        data.body = data.body.replace(
          /(<img[^c]*class="Emoji[^>]*>)|(<img[^c]*class="u-block[^>]*>)/g,
          ''
        );
      }

      // Remove display images.
      if (!showImages) {
        data.body = data.body.replace(
          /(<img[^c]*class="NaturalImage-image[^>]*>|(<img[^c]*class="CroppedImage-image[^>]*>))/g,
          ''
        );
      }
      // Remove avatar images.
      if (!printUser) {
        data.body = data.body.replace(/(<img[^c]*class="Avatar"[^>]*>)/g, '');
      }

      var div = document.createElement('div');
      div.innerHTML = data.body;
      if (typeof div.getElementsByClassName === 'undefined') {
        supportsClassName = false;
      }

      function swapDataSrc(element) {
        var avatarImg = element.getElementsByTagName('img')[0];
        avatarImg.src = avatarImg.getAttribute('data-src-2x');
        return element;
      }

      var tweets = [];
      var authors = [];
      var times = [];
      var images = [];
      var rts = [];
      var tids = [];
      var permalinksURL = [];
      var x = 0;

      if (supportsClassName) {
        var tmp = div.getElementsByClassName('timeline-Tweet');
        while (x < tmp.length) {
          if (
            tmp[x].getElementsByClassName('timeline-Tweet-retweetCredit')
              .length > 0
          ) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || (rts[x] && showRts)) {
            tweets.push(
              tmp[x].getElementsByClassName('timeline-Tweet-text')[0]
            );
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            if (printUser) {
              authors.push(
                swapDataSrc(
                  tmp[x].getElementsByClassName('timeline-Tweet-author')[0]
                )
              );
            }
            times.push(tmp[x].getElementsByClassName('dt-updated')[0]);
            permalinksURL.push(
              tmp[x].getElementsByClassName('timeline-Tweet-timestamp')[0]
            );
            if (
              tmp[x].getElementsByClassName('timeline-Tweet-media')[0] !==
              undefined
            ) {
              images.push(
                tmp[x].getElementsByClassName('timeline-Tweet-media')[0]
              );
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      } else {
        var tmp = getElementsByClassName(div, 'timeline-Tweet');
        while (x < tmp.length) {
          if (
            getElementsByClassName(tmp[x], 'timeline-Tweet-retweetCredit')
              .length > 0
          ) {
            rts.push(true);
          } else {
            rts.push(false);
          }
          if (!rts[x] || (rts[x] && showRts)) {
            tweets.push(
              getElementsByClassName(tmp[x], 'timeline-Tweet-text')[0]
            );
            tids.push(tmp[x].getAttribute('data-tweet-id'));
            if (printUser) {
              authors.push(
                swapDataSrc(
                  getElementsByClassName(tmp[x], 'timeline-Tweet-author')[0]
                )
              );
            }
            times.push(getElementsByClassName(tmp[x], 'dt-updated')[0]);
            permalinksURL.push(
              getElementsByClassName(tmp[x], 'timeline-Tweet-timestamp')[0]
            );
            if (
              getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0] !==
              undefined
            ) {
              images.push(
                getElementsByClassName(tmp[x], 'timeline-Tweet-media')[0]
              );
            } else {
              images.push(undefined);
            }
          }
          x++;
        }
      }

      if (tweets.length > maxTweets) {
        tweets.splice(maxTweets, tweets.length - maxTweets);
        authors.splice(maxTweets, authors.length - maxTweets);
        times.splice(maxTweets, times.length - maxTweets);
        rts.splice(maxTweets, rts.length - maxTweets);
        images.splice(maxTweets, images.length - maxTweets);
        permalinksURL.splice(maxTweets, permalinksURL.length - maxTweets);
      }

      var arrayTweets = [];
      var x = tweets.length;
      var n = 0;
      if (dataOnly) {
        while (n < x) {
          arrayTweets.push({
            tweet: tweets[n].innerHTML,
            author: authors[n] ? authors[n].innerHTML : 'Unknown Author',
            author_data: {
              profile_url: authors[n]
                ? authors[n].querySelector('[data-scribe="element:user_link"]')
                    .href
                : null,
              profile_image: authors[n]
                ? authors[n]
                    .querySelector('[data-scribe="element:avatar"]')
                    .getAttribute('data-src-1x')
                : null,
              profile_image_2x: authors[n]
                ? authors[n]
                    .querySelector('[data-scribe="element:avatar"]')
                    .getAttribute('data-src-2x')
                : null,
              screen_name: authors[n]
                ? authors[n].querySelector(
                    '[data-scribe="element:screen_name"]'
                  ).title
                : null,
              name: authors[n]
                ? authors[n].querySelector('[data-scribe="element:name"]').title
                : null
            },
            time: times[n].textContent,
            timestamp: times[n]
              .getAttribute('datetime')
              .replace('+0000', 'Z')
              .replace(/([\+\-])(\d\d)(\d\d)/, '$1$2:$3'),
            image: extractImageUrl(images[n]),
            rt: rts[n],
            tid: tids[n],
            permalinkURL:
              permalinksURL[n] === undefined ? '' : permalinksURL[n].href
          });
          n++;
        }
      } else {
        while (n < x) {
          if (typeof formatterFunction !== 'string') {
            var datetimeText = times[n].getAttribute('datetime');
            var newDate = new Date(
              times[n]
                .getAttribute('datetime')
                .replace(/-/g, '/')
                .replace('T', ' ')
                .split('+')[0]
            );
            var dateString = formatterFunction(newDate, datetimeText);
            times[n].setAttribute('aria-label', dateString);

            if (tweets[n].textContent) {
              // IE hack.
              if (supportsClassName) {
                times[n].textContent = dateString;
              } else {
                var h = document.createElement('p');
                var t = document.createTextNode(dateString);
                h.appendChild(t);
                h.setAttribute('aria-label', dateString);
                times[n] = h;
              }
            } else {
              times[n].textContent = dateString;
            }
          }
          var op = '';
          if (parseLinks) {
            if (targetBlank) {
              targetLinksToNewWindow(tweets[n]);
              if (printUser) {
                targetLinksToNewWindow(authors[n]);
              }
            }
            if (printUser) {
              op +=
                '<div class="user">' + strip(authors[n].innerHTML) + '</div>';
            }
            op += '<p class="tweet">' + strip(tweets[n].innerHTML) + '</p>';
            if (printTime) {
              if (permalinks) {
                op +=
                  '<p class="timePosted"><a href="' +
                  permalinksURL[n] +
                  '">' +
                  times[n].getAttribute('aria-label') +
                  '</a></p>';
              } else {
                op +=
                  '<p class="timePosted">' +
                  times[n].getAttribute('aria-label') +
                  '</p>';
              }
            }
          } else {
            if (tweets[n].textContent) {
              if (printUser) {
                op += '<p class="user">' + authors[n].textContent + '</p>';
              }
              op += '<p class="tweet">' + tweets[n].textContent + '</p>';
              if (printTime) {
                op += '<p class="timePosted">' + times[n].textContent + '</p>';
              }
            } else {
              if (printUser) {
                op += '<p class="user">' + authors[n].textContent + '</p>';
              }
              op += '<p class="tweet">' + tweets[n].textContent + '</p>';
              if (printTime) {
                op += '<p class="timePosted">' + times[n].textContent + '</p>';
              }
            }
          }
          if (showInteractionLinks) {
            op +=
              '<p class="interact"><a href="https://twitter.com/intent/' +
              'tweet?in_reply_to=' +
              tids[n] +
              '" class="twitter_reply_icon"' +
              (targetBlank ? ' target="_blank">' : '>') +
              'Reply</a><a href="https://twitter.com/intent/retweet?' +
              'tweet_id=' +
              tids[n] +
              '" class="twitter_retweet_icon"' +
              (targetBlank ? ' target="_blank">' : '>') +
              'Retweet</a>' +
              '<a href="https://twitter.com/intent/favorite?tweet_id=' +
              tids[n] +
              '" class="twitter_fav_icon"' +
              (targetBlank ? ' target="_blank">' : '>') +
              'Favorite</a></p>';
          }
          if (
            showImages &&
            images[n] !== undefined &&
            extractImageUrl(images[n]) !== undefined
          ) {
            op +=
              '<div class="media">' +
              '<img src="' +
              extractImageUrl(images[n]) +
              '" alt="Image from tweet" />' +
              '</div>';
          }
          if (showImages) {
            arrayTweets.push(op);
          } else if (!showImages && tweets[n].textContent.length) {
            arrayTweets.push(op);
          }

          n++;
        }
      }

      handleTweets(arrayTweets);
      inProgress = false;

      if (queue.length > 0) {
        twitterFetcher.fetch(queue[0]);
        queue.splice(0, 1);
      }
    }
  };

  // It must be a global variable because it will be called by JSONP.
  window.__twttrf = twitterFetcher;
  window.twitterFetcher = twitterFetcher;
  return twitterFetcher;
});

parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"qWa+":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.createElement=exports.h=r,exports.cloneElement=a,exports.Component=A,exports.render=H,exports.rerender=u,exports.options=exports.default=void 0;var e=function(){},t={};exports.options=t;var n=[],o=[];function r(r,i){var l,a,s,p,c=o;for(p=arguments.length;p-- >2;)n.push(arguments[p]);for(i&&null!=i.children&&(n.length||n.push(i.children),delete i.children);n.length;)if((a=n.pop())&&void 0!==a.pop)for(p=a.length;p--;)n.push(a[p]);else"boolean"==typeof a&&(a=null),(s="function"!=typeof r)&&(null==a?a="":"number"==typeof a?a=String(a):"string"!=typeof a&&(s=!1)),s&&l?c[c.length-1]+=a:c===o?c=[a]:c.push(a),l=s;var u=new e;return u.nodeName=r,u.children=c,u.attributes=null==i?void 0:i,u.key=null==i?void 0:i.key,void 0!==t.vnode&&t.vnode(u),u}function i(e,t){for(var n in t)e[n]=t[n];return e}var l="function"==typeof Promise?Promise.resolve().then.bind(Promise.resolve()):setTimeout;function a(e,t){return r(e.nodeName,i(i({},e.attributes),t),arguments.length>2?[].slice.call(arguments,2):e.children)}var s=/acit|ex(?:s|g|n|p|$)|rph|ows|mnc|ntw|ine[ch]|zoo|^ord/i,p=[];function c(e){!e._dirty&&(e._dirty=!0)&&1==p.push(e)&&(t.debounceRendering||l)(u)}function u(){var e,t=p;for(p=[];e=t.pop();)e._dirty&&W(e)}function d(e,t,n){return"string"==typeof t||"number"==typeof t?void 0!==e.splitText:"string"==typeof t.nodeName?!e._componentConstructor&&f(e,t.nodeName):n||e._componentConstructor===t.nodeName}function f(e,t){return e.normalizedNodeName===t||e.nodeName.toLowerCase()===t.toLowerCase()}function v(e){var t=i({},e.attributes);t.children=e.children;var n=e.nodeName.defaultProps;if(void 0!==n)for(var o in n)void 0===t[o]&&(t[o]=n[o]);return t}function _(e,t){var n=t?document.createElementNS("http://www.w3.org/2000/svg",e):document.createElement(e);return n.normalizedNodeName=e,n}function m(e){var t=e.parentNode;t&&t.removeChild(e)}function h(e,t,n,o,r){if("className"===t&&(t="class"),"key"===t);else if("ref"===t)n&&n(null),o&&o(e);else if("class"!==t||r)if("style"===t){if(o&&"string"!=typeof o&&"string"!=typeof n||(e.style.cssText=o||""),o&&"object"==typeof o){if("string"!=typeof n)for(var i in n)i in o||(e.style[i]="");for(var i in o)e.style[i]="number"==typeof o[i]&&!1===s.test(i)?o[i]+"px":o[i]}}else if("dangerouslySetInnerHTML"===t)o&&(e.innerHTML=o.__html||"");else if("o"==t[0]&&"n"==t[1]){var l=t!==(t=t.replace(/Capture$/,""));t=t.toLowerCase().substring(2),o?n||e.addEventListener(t,y,l):e.removeEventListener(t,y,l),(e._listeners||(e._listeners={}))[t]=o}else if("list"!==t&&"type"!==t&&!r&&t in e){try{e[t]=null==o?"":o}catch(p){}null!=o&&!1!==o||"spellcheck"==t||e.removeAttribute(t)}else{var a=r&&t!==(t=t.replace(/^xlink:?/,""));null==o||!1===o?a?e.removeAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase()):e.removeAttribute(t):"function"!=typeof o&&(a?e.setAttributeNS("http://www.w3.org/1999/xlink",t.toLowerCase(),o):e.setAttribute(t,o))}else e.className=o||""}function y(e){return this._listeners[e.type](t.event&&t.event(e)||e)}var b=[],x=0,g=!1,C=!1;function N(){for(var e;e=b.pop();)t.afterMount&&t.afterMount(e),e.componentDidMount&&e.componentDidMount()}function w(e,t,n,o,r,i){x++||(g=null!=r&&void 0!==r.ownerSVGElement,C=null!=e&&!("__preactattr_"in e));var l=k(e,t,n,o,i);return r&&l.parentNode!==r&&r.appendChild(l),--x||(C=!1,i||N()),l}function k(e,t,n,o,r){var i=e,l=g;if(null!=t&&"boolean"!=typeof t||(t=""),"string"==typeof t||"number"==typeof t)return e&&void 0!==e.splitText&&e.parentNode&&(!e._component||r)?e.nodeValue!=t&&(e.nodeValue=t):(i=document.createTextNode(t),e&&(e.parentNode&&e.parentNode.replaceChild(i,e),U(e,!0))),i.__preactattr_=!0,i;var a=t.nodeName;if("function"==typeof a)return D(e,t,n,o);if(g="svg"===a||"foreignObject"!==a&&g,a=String(a),(!e||!f(e,a))&&(i=_(a,g),e)){for(;e.firstChild;)i.appendChild(e.firstChild);e.parentNode&&e.parentNode.replaceChild(i,e),U(e,!0)}var s=i.firstChild,p=i.__preactattr_,c=t.children;if(null==p){p=i.__preactattr_={};for(var u=i.attributes,d=u.length;d--;)p[u[d].name]=u[d].value}return!C&&c&&1===c.length&&"string"==typeof c[0]&&null!=s&&void 0!==s.splitText&&null==s.nextSibling?s.nodeValue!=c[0]&&(s.nodeValue=c[0]):(c&&c.length||null!=s)&&S(i,c,n,o,C||null!=p.dangerouslySetInnerHTML),B(i,t.attributes,p),g=l,i}function S(e,t,n,o,r){var i,l,a,s,p,c=e.childNodes,u=[],f={},v=0,_=0,h=c.length,y=0,b=t?t.length:0;if(0!==h)for(var x=0;x<h;x++){var g=c[x],C=g.__preactattr_;null!=(N=b&&C?g._component?g._component.__key:C.key:null)?(v++,f[N]=g):(C||(void 0!==g.splitText?!r||g.nodeValue.trim():r))&&(u[y++]=g)}if(0!==b)for(x=0;x<b;x++){var N;if(p=null,null!=(N=(s=t[x]).key))v&&void 0!==f[N]&&(p=f[N],f[N]=void 0,v--);else if(_<y)for(i=_;i<y;i++)if(void 0!==u[i]&&d(l=u[i],s,r)){p=l,u[i]=void 0,i===y-1&&y--,i===_&&_++;break}p=k(p,s,n,o),a=c[x],p&&p!==e&&p!==a&&(null==a?e.appendChild(p):p===a.nextSibling?m(a):e.insertBefore(p,a))}if(v)for(var x in f)void 0!==f[x]&&U(f[x],!1);for(;_<=y;)void 0!==(p=u[y--])&&U(p,!1)}function U(e,t){var n=e._component;n?V(n):(null!=e.__preactattr_&&e.__preactattr_.ref&&e.__preactattr_.ref(null),!1!==t&&null!=e.__preactattr_||m(e),P(e))}function P(e){for(e=e.lastChild;e;){var t=e.previousSibling;U(e,!0),e=t}}function B(e,t,n){var o;for(o in n)t&&null!=t[o]||null==n[o]||h(e,o,n[o],n[o]=void 0,g);for(o in t)"children"===o||"innerHTML"===o||o in n&&t[o]===("value"===o||"checked"===o?e[o]:n[o])||h(e,o,n[o],n[o]=t[o],g)}var L=[];function M(e,t,n){var o,r=L.length;for(e.prototype&&e.prototype.render?(o=new e(t,n),A.call(o,t,n)):((o=new A(t,n)).constructor=e,o.render=T);r--;)if(L[r].constructor===e)return o.nextBase=L[r].nextBase,L.splice(r,1),o;return o}function T(e,t,n){return this.constructor(e,n)}function E(e,n,o,r,i){e._disable||(e._disable=!0,e.__ref=n.ref,e.__key=n.key,delete n.ref,delete n.key,void 0===e.constructor.getDerivedStateFromProps&&(!e.base||i?e.componentWillMount&&e.componentWillMount():e.componentWillReceiveProps&&e.componentWillReceiveProps(n,r)),r&&r!==e.context&&(e.prevContext||(e.prevContext=e.context),e.context=r),e.prevProps||(e.prevProps=e.props),e.props=n,e._disable=!1,0!==o&&(1!==o&&!1===t.syncComponentUpdates&&e.base?c(e):W(e,1,i)),e.__ref&&e.__ref(e))}function W(e,n,o,r){if(!e._disable){var l,a,s,p=e.props,c=e.state,u=e.context,d=e.prevProps||p,f=e.prevState||c,_=e.prevContext||u,m=e.base,h=e.nextBase,y=m||h,g=e._component,C=!1,k=_;if(e.constructor.getDerivedStateFromProps&&(c=i(i({},c),e.constructor.getDerivedStateFromProps(p,c)),e.state=c),m&&(e.props=d,e.state=f,e.context=_,2!==n&&e.shouldComponentUpdate&&!1===e.shouldComponentUpdate(p,c,u)?C=!0:e.componentWillUpdate&&e.componentWillUpdate(p,c,u),e.props=p,e.state=c,e.context=u),e.prevProps=e.prevState=e.prevContext=e.nextBase=null,e._dirty=!1,!C){l=e.render(p,c,u),e.getChildContext&&(u=i(i({},u),e.getChildContext())),m&&e.getSnapshotBeforeUpdate&&(k=e.getSnapshotBeforeUpdate(d,f));var S,P,B=l&&l.nodeName;if("function"==typeof B){var L=v(l);(a=g)&&a.constructor===B&&L.key==a.__key?E(a,L,1,u,!1):(S=a,e._component=a=M(B,L,u),a.nextBase=a.nextBase||h,a._parentComponent=e,E(a,L,0,u,!1),W(a,1,o,!0)),P=a.base}else s=y,(S=g)&&(s=e._component=null),(y||1===n)&&(s&&(s._component=null),P=w(s,l,u,o||!m,y&&y.parentNode,!0));if(y&&P!==y&&a!==g){var T=y.parentNode;T&&P!==T&&(T.replaceChild(P,y),S||(y._component=null,U(y,!1)))}if(S&&V(S),e.base=P,P&&!r){for(var D=e,A=e;A=A._parentComponent;)(D=A).base=P;P._component=D,P._componentConstructor=D.constructor}}for(!m||o?b.unshift(e):C||(e.componentDidUpdate&&e.componentDidUpdate(d,f,k),t.afterUpdate&&t.afterUpdate(e));e._renderCallbacks.length;)e._renderCallbacks.pop().call(e);x||r||N()}}function D(e,t,n,o){for(var r=e&&e._component,i=r,l=e,a=r&&e._componentConstructor===t.nodeName,s=a,p=v(t);r&&!s&&(r=r._parentComponent);)s=r.constructor===t.nodeName;return r&&s&&(!o||r._component)?(E(r,p,3,n,o),e=r.base):(i&&!a&&(V(i),e=l=null),r=M(t.nodeName,p,n),e&&!r.nextBase&&(r.nextBase=e,l=null),E(r,p,1,n,o),e=r.base,l&&e!==l&&(l._component=null,U(l,!1))),e}function V(e){t.beforeUnmount&&t.beforeUnmount(e);var n=e.base;e._disable=!0,e.componentWillUnmount&&e.componentWillUnmount(),e.base=null;var o=e._component;o?V(o):n&&(n.__preactattr_&&n.__preactattr_.ref&&n.__preactattr_.ref(null),e.nextBase=n,m(n),L.push(e),P(n)),e.__ref&&e.__ref(null)}function A(e,t){this._dirty=!0,this.context=t,this.props=e,this.state=this.state||{},this._renderCallbacks=[]}function H(e,t,n){return w(n,e,{},!1,t,!1)}i(A.prototype,{setState:function(e,t){this.prevState||(this.prevState=this.state),this.state=i(i({},this.state),"function"==typeof e?e(this.state,this.props):e),t&&this._renderCallbacks.push(t),c(this)},forceUpdate:function(e){e&&this._renderCallbacks.push(e),W(this,2)},render:function(){}});var j={h:r,createElement:r,cloneElement:a,Component:A,render:H,rerender:u,options:t},z=j;exports.default=z;
},{}],"QTcd":[function(require,module,exports) {
var global = arguments[3];
var t=arguments[3];!function(t){"use strict";var r,e=Object.prototype,n=e.hasOwnProperty,o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag",u="object"==typeof module,h=t.regeneratorRuntime;if(h)u&&(module.exports=h);else{(h=t.regeneratorRuntime=u?module.exports:{}).wrap=w;var f="suspendedStart",s="suspendedYield",l="executing",p="completed",y={},v={};v[i]=function(){return this};var d=Object.getPrototypeOf,g=d&&d(d(P([])));g&&g!==e&&n.call(g,i)&&(v=g);var m=b.prototype=x.prototype=Object.create(v);E.prototype=m.constructor=b,b.constructor=E,b[c]=E.displayName="GeneratorFunction",h.isGeneratorFunction=function(t){var r="function"==typeof t&&t.constructor;return!!r&&(r===E||"GeneratorFunction"===(r.displayName||r.name))},h.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,b):(t.__proto__=b,c in t||(t[c]="GeneratorFunction")),t.prototype=Object.create(m),t},h.awrap=function(t){return{__await:t}},_(j.prototype),j.prototype[a]=function(){return this},h.AsyncIterator=j,h.async=function(t,r,e,n){var o=new j(w(t,r,e,n));return h.isGeneratorFunction(r)?o:o.next().then(function(t){return t.done?t.value:o.next()})},_(m),m[c]="Generator",m[i]=function(){return this},m.toString=function(){return"[object Generator]"},h.keys=function(t){var r=[];for(var e in t)r.push(e);return r.reverse(),function e(){for(;r.length;){var n=r.pop();if(n in t)return e.value=n,e.done=!1,e}return e.done=!0,e}},h.values=P,N.prototype={constructor:N,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=r,this.done=!1,this.delegate=null,this.method="next",this.arg=r,this.tryEntries.forEach(G),!t)for(var e in this)"t"===e.charAt(0)&&n.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=r)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function o(n,o){return c.type="throw",c.arg=t,e.next=n,o&&(e.method="next",e.arg=r),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],c=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var u=n.call(a,"catchLoc"),h=n.call(a,"finallyLoc");if(u&&h){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(u){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!h)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,r){for(var e=this.tryEntries.length-1;e>=0;--e){var o=this.tryEntries[e];if(o.tryLoc<=this.prev&&n.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=r&&r<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=r,i?(this.method="next",this.next=i.finallyLoc,y):this.complete(a)},complete:function(t,r){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&r&&(this.next=r),y},finish:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.finallyLoc===t)return this.complete(e.completion,e.afterLoc),G(e),y}},catch:function(t){for(var r=this.tryEntries.length-1;r>=0;--r){var e=this.tryEntries[r];if(e.tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;G(e)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,e,n){return this.delegate={iterator:P(t),resultName:e,nextLoc:n},"next"===this.method&&(this.arg=r),y}}}function w(t,r,e,n){var o=r&&r.prototype instanceof x?r:x,i=Object.create(o.prototype),a=new N(n||[]);return i._invoke=function(t,r,e){var n=f;return function(o,i){if(n===l)throw new Error("Generator is already running");if(n===p){if("throw"===o)throw i;return F()}for(e.method=o,e.arg=i;;){var a=e.delegate;if(a){var c=O(a,e);if(c){if(c===y)continue;return c}}if("next"===e.method)e.sent=e._sent=e.arg;else if("throw"===e.method){if(n===f)throw n=p,e.arg;e.dispatchException(e.arg)}else"return"===e.method&&e.abrupt("return",e.arg);n=l;var u=L(t,r,e);if("normal"===u.type){if(n=e.done?p:s,u.arg===y)continue;return{value:u.arg,done:e.done}}"throw"===u.type&&(n=p,e.method="throw",e.arg=u.arg)}}}(t,e,a),i}function L(t,r,e){try{return{type:"normal",arg:t.call(r,e)}}catch(n){return{type:"throw",arg:n}}}function x(){}function E(){}function b(){}function _(t){["next","throw","return"].forEach(function(r){t[r]=function(t){return this._invoke(r,t)}})}function j(t){var r;this._invoke=function(e,o){function i(){return new Promise(function(r,i){!function r(e,o,i,a){var c=L(t[e],t,o);if("throw"!==c.type){var u=c.arg,h=u.value;return h&&"object"==typeof h&&n.call(h,"__await")?Promise.resolve(h.__await).then(function(t){r("next",t,i,a)},function(t){r("throw",t,i,a)}):Promise.resolve(h).then(function(t){u.value=t,i(u)},function(t){return r("throw",t,i,a)})}a(c.arg)}(e,o,r,i)})}return r=r?r.then(i,i):i()}}function O(t,e){var n=t.iterator[e.method];if(n===r){if(e.delegate=null,"throw"===e.method){if(t.iterator.return&&(e.method="return",e.arg=r,O(t,e),"throw"===e.method))return y;e.method="throw",e.arg=new TypeError("The iterator does not provide a 'throw' method")}return y}var o=L(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,y;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=r),e.delegate=null,y):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,y)}function k(t){var r={tryLoc:t[0]};1 in t&&(r.catchLoc=t[1]),2 in t&&(r.finallyLoc=t[2],r.afterLoc=t[3]),this.tryEntries.push(r)}function G(t){var r=t.completion||{};r.type="normal",delete r.arg,t.completion=r}function N(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(k,this),this.reset(!0)}function P(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function e(){for(;++o<t.length;)if(n.call(t,o))return e.value=t[o],e.done=!1,e;return e.value=r,e.done=!0,e};return a.next=a}}return{next:F}}function F(){return{value:r,done:!0}}}(function(){return this||"object"==typeof self&&self}()||Function("return this")());
},{}],"jsKO":[function(require,module,exports) {
var e=function(){return this||"object"==typeof self&&self}()||Function("return this")(),r=e.regeneratorRuntime&&Object.getOwnPropertyNames(e).indexOf("regeneratorRuntime")>=0,t=r&&e.regeneratorRuntime;if(e.regeneratorRuntime=void 0,module.exports=require("./runtime"),r)e.regeneratorRuntime=t;else try{delete e.regeneratorRuntime}catch(n){e.regeneratorRuntime=void 0}
},{"./runtime":"QTcd"}],"8m4e":[function(require,module,exports) {
module.exports=require("regenerator-runtime");
},{"regenerator-runtime":"jsKO"}],"2fws":[function(require,module,exports) {
function n(n,t,o,r,e,i,u){try{var c=n[i](u),v=c.value}catch(a){return void o(a)}c.done?t(v):Promise.resolve(v).then(r,e)}function t(t){return function(){var o=this,r=arguments;return new Promise(function(e,i){var u=t.apply(o,r);function c(t){n(u,e,i,c,v,"next",t)}function v(t){n(u,e,i,c,v,"throw",t)}c(void 0)})}}module.exports=t;
},{}],"fk2o":[function(require,module,exports) {
function r(r){if(Array.isArray(r)){for(var e=0,n=new Array(r.length);e<r.length;e++)n[e]=r[e];return n}}module.exports=r;
},{}],"rp83":[function(require,module,exports) {
function t(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}module.exports=t;
},{}],"v+5/":[function(require,module,exports) {
function e(){throw new TypeError("Invalid attempt to spread non-iterable instance")}module.exports=e;
},{}],"03Yt":[function(require,module,exports) {
var r=require("./arrayWithoutHoles"),e=require("./iterableToArray"),a=require("./nonIterableSpread");function o(o){return r(o)||e(o)||a()}module.exports=o;
},{"./arrayWithoutHoles":"fk2o","./iterableToArray":"rp83","./nonIterableSpread":"v+5/"}],"ZBnv":[function(require,module,exports) {
function n(n,o){if(!(n instanceof o))throw new TypeError("Cannot call a class as a function")}module.exports=n;
},{}],"No+o":[function(require,module,exports) {
function e(e,r){for(var n=0;n<r.length;n++){var t=r[n];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(e,t.key,t)}}function r(r,n,t){return n&&e(r.prototype,n),t&&e(r,t),r}module.exports=r;
},{}],"LNzP":[function(require,module,exports) {
function o(t){return(o="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(o){return typeof o}:function(o){return o&&"function"==typeof Symbol&&o.constructor===Symbol&&o!==Symbol.prototype?"symbol":typeof o})(t)}function t(n){return"function"==typeof Symbol&&"symbol"===o(Symbol.iterator)?module.exports=t=function(t){return o(t)}:module.exports=t=function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":o(t)},t(n)}module.exports=t;
},{}],"VmQe":[function(require,module,exports) {
function e(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}module.exports=e;
},{}],"GF/C":[function(require,module,exports) {
var e=require("../helpers/typeof"),r=require("./assertThisInitialized");function t(t,i){return!i||"object"!==e(i)&&"function"!=typeof i?r(t):i}module.exports=t;
},{"../helpers/typeof":"LNzP","./assertThisInitialized":"VmQe"}],"9WQg":[function(require,module,exports) {
function t(e){return module.exports=t=Object.setPrototypeOf?Object.getPrototypeOf:function(t){return t.__proto__||Object.getPrototypeOf(t)},t(e)}module.exports=t;
},{}],"Jibl":[function(require,module,exports) {
function t(o,e){return module.exports=t=Object.setPrototypeOf||function(t,o){return t.__proto__=o,t},t(o,e)}module.exports=t;
},{}],"9qng":[function(require,module,exports) {
var e=require("./setPrototypeOf");function r(r,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function");r.prototype=Object.create(t&&t.prototype,{constructor:{value:r,writable:!0,configurable:!0}}),t&&e(r,t)}module.exports=r;
},{"./setPrototypeOf":"Jibl"}],"xwXl":[function(require,module,exports) {
function e(e,r,n){return r in e?Object.defineProperty(e,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[r]=n,e}module.exports=e;
},{}],"MScu":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Headers=a,exports.Request=m,exports.Response=A,exports.fetch=x,exports.DOMException=void 0;var t={searchParams:"URLSearchParams"in self,iterable:"Symbol"in self&&"iterator"in Symbol,blob:"FileReader"in self&&"Blob"in self&&function(){try{return new Blob,!0}catch(t){return!1}}(),formData:"FormData"in self,arrayBuffer:"ArrayBuffer"in self};function e(t){return t&&DataView.prototype.isPrototypeOf(t)}if(t.arrayBuffer)var r=["[object Int8Array]","[object Uint8Array]","[object Uint8ClampedArray]","[object Int16Array]","[object Uint16Array]","[object Int32Array]","[object Uint32Array]","[object Float32Array]","[object Float64Array]"],o=ArrayBuffer.isView||function(t){return t&&r.indexOf(Object.prototype.toString.call(t))>-1};function n(t){if("string"!=typeof t&&(t=String(t)),/[^a-z0-9\-#$%&'*+.^_`|~]/i.test(t))throw new TypeError("Invalid character in header field name");return t.toLowerCase()}function s(t){return"string"!=typeof t&&(t=String(t)),t}function i(e){var r={next:function(){var t=e.shift();return{done:void 0===t,value:t}}};return t.iterable&&(r[Symbol.iterator]=function(){return r}),r}function a(t){this.map={},t instanceof a?t.forEach(function(t,e){this.append(e,t)},this):Array.isArray(t)?t.forEach(function(t){this.append(t[0],t[1])},this):t&&Object.getOwnPropertyNames(t).forEach(function(e){this.append(e,t[e])},this)}function h(t){if(t.bodyUsed)return Promise.reject(new TypeError("Already read"));t.bodyUsed=!0}function u(t){return new Promise(function(e,r){t.onload=function(){e(t.result)},t.onerror=function(){r(t.error)}})}function f(t){var e=new FileReader,r=u(e);return e.readAsArrayBuffer(t),r}function d(t){var e=new FileReader,r=u(e);return e.readAsText(t),r}function l(t){for(var e=new Uint8Array(t),r=new Array(e.length),o=0;o<e.length;o++)r[o]=String.fromCharCode(e[o]);return r.join("")}function c(t){if(t.slice)return t.slice(0);var e=new Uint8Array(t.byteLength);return e.set(new Uint8Array(t)),e.buffer}function y(){return this.bodyUsed=!1,this._initBody=function(r){this._bodyInit=r,r?"string"==typeof r?this._bodyText=r:t.blob&&Blob.prototype.isPrototypeOf(r)?this._bodyBlob=r:t.formData&&FormData.prototype.isPrototypeOf(r)?this._bodyFormData=r:t.searchParams&&URLSearchParams.prototype.isPrototypeOf(r)?this._bodyText=r.toString():t.arrayBuffer&&t.blob&&e(r)?(this._bodyArrayBuffer=c(r.buffer),this._bodyInit=new Blob([this._bodyArrayBuffer])):t.arrayBuffer&&(ArrayBuffer.prototype.isPrototypeOf(r)||o(r))?this._bodyArrayBuffer=c(r):this._bodyText=r=Object.prototype.toString.call(r):this._bodyText="",this.headers.get("content-type")||("string"==typeof r?this.headers.set("content-type","text/plain;charset=UTF-8"):this._bodyBlob&&this._bodyBlob.type?this.headers.set("content-type",this._bodyBlob.type):t.searchParams&&URLSearchParams.prototype.isPrototypeOf(r)&&this.headers.set("content-type","application/x-www-form-urlencoded;charset=UTF-8"))},t.blob&&(this.blob=function(){var t=h(this);if(t)return t;if(this._bodyBlob)return Promise.resolve(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(new Blob([this._bodyArrayBuffer]));if(this._bodyFormData)throw new Error("could not read FormData body as blob");return Promise.resolve(new Blob([this._bodyText]))},this.arrayBuffer=function(){return this._bodyArrayBuffer?h(this)||Promise.resolve(this._bodyArrayBuffer):this.blob().then(f)}),this.text=function(){var t=h(this);if(t)return t;if(this._bodyBlob)return d(this._bodyBlob);if(this._bodyArrayBuffer)return Promise.resolve(l(this._bodyArrayBuffer));if(this._bodyFormData)throw new Error("could not read FormData body as text");return Promise.resolve(this._bodyText)},t.formData&&(this.formData=function(){return this.text().then(w)}),this.json=function(){return this.text().then(JSON.parse)},this}a.prototype.append=function(t,e){t=n(t),e=s(e);var r=this.map[t];this.map[t]=r?r+", "+e:e},a.prototype.delete=function(t){delete this.map[n(t)]},a.prototype.get=function(t){return t=n(t),this.has(t)?this.map[t]:null},a.prototype.has=function(t){return this.map.hasOwnProperty(n(t))},a.prototype.set=function(t,e){this.map[n(t)]=s(e)},a.prototype.forEach=function(t,e){for(var r in this.map)this.map.hasOwnProperty(r)&&t.call(e,this.map[r],r,this)},a.prototype.keys=function(){var t=[];return this.forEach(function(e,r){t.push(r)}),i(t)},a.prototype.values=function(){var t=[];return this.forEach(function(e){t.push(e)}),i(t)},a.prototype.entries=function(){var t=[];return this.forEach(function(e,r){t.push([r,e])}),i(t)},t.iterable&&(a.prototype[Symbol.iterator]=a.prototype.entries);var p=["DELETE","GET","HEAD","OPTIONS","POST","PUT"];function b(t){var e=t.toUpperCase();return p.indexOf(e)>-1?e:t}function m(t,e){var r=(e=e||{}).body;if(t instanceof m){if(t.bodyUsed)throw new TypeError("Already read");this.url=t.url,this.credentials=t.credentials,e.headers||(this.headers=new a(t.headers)),this.method=t.method,this.mode=t.mode,this.signal=t.signal,r||null==t._bodyInit||(r=t._bodyInit,t.bodyUsed=!0)}else this.url=String(t);if(this.credentials=e.credentials||this.credentials||"same-origin",!e.headers&&this.headers||(this.headers=new a(e.headers)),this.method=b(e.method||this.method||"GET"),this.mode=e.mode||this.mode||null,this.signal=e.signal||this.signal,this.referrer=null,("GET"===this.method||"HEAD"===this.method)&&r)throw new TypeError("Body not allowed for GET or HEAD requests");this._initBody(r)}function w(t){var e=new FormData;return t.trim().split("&").forEach(function(t){if(t){var r=t.split("="),o=r.shift().replace(/\+/g," "),n=r.join("=").replace(/\+/g," ");e.append(decodeURIComponent(o),decodeURIComponent(n))}}),e}function v(t){var e=new a;return t.replace(/\r?\n[\t ]+/g," ").split(/\r?\n/).forEach(function(t){var r=t.split(":"),o=r.shift().trim();if(o){var n=r.join(":").trim();e.append(o,n)}}),e}function A(t,e){e||(e={}),this.type="default",this.status=void 0===e.status?200:e.status,this.ok=this.status>=200&&this.status<300,this.statusText="statusText"in e?e.statusText:"OK",this.headers=new a(e.headers),this.url=e.url||"",this._initBody(t)}m.prototype.clone=function(){return new m(this,{body:this._bodyInit})},y.call(m.prototype),y.call(A.prototype),A.prototype.clone=function(){return new A(this._bodyInit,{status:this.status,statusText:this.statusText,headers:new a(this.headers),url:this.url})},A.error=function(){var t=new A(null,{status:0,statusText:""});return t.type="error",t};var _=[301,302,303,307,308];A.redirect=function(t,e){if(-1===_.indexOf(e))throw new RangeError("Invalid status code");return new A(null,{status:e,headers:{location:t}})};var E=self.DOMException;exports.DOMException=E;try{new E}catch(g){exports.DOMException=E=function(t,e){this.message=t,this.name=e;var r=Error(t);this.stack=r.stack},E.prototype=Object.create(Error.prototype),E.prototype.constructor=E}function x(e,r){return new Promise(function(o,n){var s=new m(e,r);if(s.signal&&s.signal.aborted)return n(new E("Aborted","AbortError"));var i=new XMLHttpRequest;function a(){i.abort()}i.onload=function(){var t={status:i.status,statusText:i.statusText,headers:v(i.getAllResponseHeaders()||"")};t.url="responseURL"in i?i.responseURL:t.headers.get("X-Request-URL");var e="response"in i?i.response:i.responseText;o(new A(e,t))},i.onerror=function(){n(new TypeError("Network request failed"))},i.ontimeout=function(){n(new TypeError("Network request failed"))},i.onabort=function(){n(new E("Aborted","AbortError"))},i.open(s.method,s.url,!0),"include"===s.credentials?i.withCredentials=!0:"omit"===s.credentials&&(i.withCredentials=!1),"responseType"in i&&t.blob&&(i.responseType="blob"),s.headers.forEach(function(t,e){i.setRequestHeader(e,t)}),s.signal&&(s.signal.addEventListener("abort",a),i.onreadystatechange=function(){4===i.readyState&&s.signal.removeEventListener("abort",a)}),i.send(void 0===s._bodyInit?null:s._bodyInit)})}x.polyfill=!0,self.fetch||(self.fetch=x,self.Headers=a,self.Request=m,self.Response=A);
},{}],"wR74":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.Loader=exports.Right=exports.Left=exports.Close=void 0;var t=require("preact"),e=function(){return(0,t.h)("svg",{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",version:"1.1"},(0,t.h)("path",{fill:"#fff",d:"M24 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zM24 43.5c-10.77 0-19.5-8.73-19.5-19.5s8.73-19.5 19.5-19.5 19.5 8.73 19.5 19.5-8.73 19.5-19.5 19.5z"}),(0,t.h)("path",{fill:"#fff",d:"M31.5 12l-7.5 7.5-7.5-7.5-4.5 4.5 7.5 7.5-7.5 7.5 4.5 4.5 7.5-7.5 7.5 7.5 4.5-4.5-7.5-7.5 7.5-7.5z"}))};exports.Close=e;var i=function(){return(0,t.h)("svg",{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",version:"1.1"},(0,t.h)("path",{fill:"#fff",d:"M24 48c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24zM24 4.5c10.77 0 19.5 8.73 19.5 19.5s-8.73 19.5-19.5 19.5-19.5-8.73-19.5-19.5 8.73-19.5 19.5-19.5z"}),(0,t.h)("path",{fill:"#fff",d:"M31.371 14.871l-4.243-4.243-13.371 13.371 13.371 13.371 4.243-4.243-9.129-9.129z"}))};exports.Left=i;var l=function(){return(0,t.h)("svg",{width:"48",height:"48",viewBox:"0 0 48 48",xmlns:"http://www.w3.org/2000/svg",version:"1.1"},(0,t.h)("path",{fill:"#fff",d:"M24 0c-13.255 0-24 10.745-24 24s10.745 24 24 24 24-10.745 24-24-10.745-24-24-24zM24 43.5c-10.77 0-19.5-8.73-19.5-19.5s8.73-19.5 19.5-19.5 19.5 8.73 19.5 19.5-8.73 19.5-19.5 19.5z"}),(0,t.h)("path",{fill:"#fff",d:"M16.629 33.129l4.243 4.243 13.371-13.371-13.371-13.371-4.243 4.243 9.129 9.129z"}))};exports.Right=l;var r=function(e){var i=e.className,l=void 0===i?"":i,r=e.color;return(0,t.h)("svg",{className:l,viewBox:"0 0 140 64",fill:r,xmlns:"http://www.w3.org/2000/svg",version:"1.1"},(0,t.h)("path",{d:"M30.262 57.02L7.195 40.723c-5.84-3.976-7.56-12.06-3.842-18.063 3.715-6 11.467-7.65 17.306-3.68l4.52 3.76 2.6-5.274c3.717-6.002 11.47-7.65 17.305-3.68 5.84 3.97 7.56 12.054 3.842 18.062L34.49 56.118c-.897 1.512-2.793 1.915-4.228.9z",fillOpacity:".5"},(0,t.h)("animate",{attributeName:"fill-opacity",begin:"0s",dur:"1.4s",values:"0.5;1;0.5",calcMode:"linear",repeatCount:"indefinite"})),(0,t.h)("path",{d:"M105.512 56.12l-14.44-24.272c-3.716-6.008-1.996-14.093 3.843-18.062 5.835-3.97 13.588-2.322 17.306 3.68l2.6 5.274 4.52-3.76c5.84-3.97 13.592-2.32 17.307 3.68 3.718 6.003 1.998 14.088-3.842 18.064L109.74 57.02c-1.434 1.014-3.33.61-4.228-.9z",fillOpacity:".5"},(0,t.h)("animate",{attributeName:"fill-opacity",begin:"0.7s",dur:"1.4s",values:"0.5;1;0.5",calcMode:"linear",repeatCount:"indefinite"})),(0,t.h)("path",{d:"M67.408 57.834l-23.01-24.98c-5.864-6.15-5.864-16.108 0-22.248 5.86-6.14 15.37-6.14 21.234 0L70 16.168l4.368-5.562c5.863-6.14 15.375-6.14 21.235 0 5.863 6.14 5.863 16.098 0 22.247l-23.007 24.98c-1.43 1.556-3.757 1.556-5.188 0z"}))};exports.Loader=r;
},{"preact":"qWa+"}],"OnDc":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=o(require("@babel/runtime/helpers/classCallCheck")),r=o(require("@babel/runtime/helpers/createClass")),t=o(require("@babel/runtime/helpers/possibleConstructorReturn")),a=o(require("@babel/runtime/helpers/getPrototypeOf")),l=o(require("@babel/runtime/helpers/inherits")),s=o(require("@babel/runtime/helpers/assertThisInitialized")),i=o(require("@babel/runtime/helpers/defineProperty")),u=require("preact"),n=require("./icons");function o(e){return e&&e.__esModule?e:{default:e}}var h=function(){return(0,u.h)("li",{className:"glry-item glry-item-empty"},(0,u.h)(n.Loader,{className:"glry-loader",color:"#bbb"}))},d=function(e){var r=e.data,t=e.handleClick;return(0,u.h)("li",{className:"glry-item",onClick:t},(0,u.h)("img",{src:r.s}))},p=function(n){function o(){var r,l;(0,e.default)(this,o);for(var u=arguments.length,n=new Array(u),h=0;h<u;h++)n[h]=arguments[h];return l=(0,t.default)(this,(r=(0,a.default)(o)).call.apply(r,[this].concat(n))),(0,i.default)((0,s.default)((0,s.default)(l)),"state",{hasImage:!1}),l}return(0,l.default)(o,n),(0,r.default)(o,[{key:"render",value:function(){var e=this;if(this.props.data&&!this.state.hasImage){var r=new Image;r.src=this.props.data.s,r.onload=function(){return e.setState({hasImage:!0})}}return this.props.data&&this.state.hasImage?(0,u.h)(d,{data:this.props.data,handleClick:this.props.handleClick}):(0,u.h)(h,null)}}]),o}(u.Component),c=p;exports.default=c;
},{"@babel/runtime/helpers/classCallCheck":"ZBnv","@babel/runtime/helpers/createClass":"No+o","@babel/runtime/helpers/possibleConstructorReturn":"GF/C","@babel/runtime/helpers/getPrototypeOf":"9WQg","@babel/runtime/helpers/inherits":"9qng","@babel/runtime/helpers/assertThisInitialized":"VmQe","@babel/runtime/helpers/defineProperty":"xwXl","preact":"qWa+","./icons":"wR74"}],"9HQL":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=u(require("@babel/runtime/helpers/classCallCheck")),t=u(require("@babel/runtime/helpers/createClass")),r=u(require("@babel/runtime/helpers/possibleConstructorReturn")),l=u(require("@babel/runtime/helpers/getPrototypeOf")),a=u(require("@babel/runtime/helpers/inherits")),s=u(require("@babel/runtime/helpers/assertThisInitialized")),n=u(require("@babel/runtime/helpers/defineProperty")),i=require("preact"),o=require("./icons");function u(e){return e&&e.__esModule?e:{default:e}}var d=function(u){function d(){var t,a;(0,e.default)(this,d);for(var i=arguments.length,o=new Array(i),u=0;u<i;u++)o[u]=arguments[u];return a=(0,r.default)(this,(t=(0,l.default)(d)).call.apply(t,[this].concat(o))),(0,n.default)((0,s.default)((0,s.default)(a)),"state",{src:""}),(0,n.default)((0,s.default)((0,s.default)(a)),"hasEventListener",!1),(0,n.default)((0,s.default)((0,s.default)(a)),"handleKey",function(e){"Escape"===e.key?a.props.close():"ArrowRight"===e.key||"ArrowDown"===e.key?a.props.next():"ArrowLeft"!==e.key&&"ArrowUp"!==e.key||a.props.back()}),a}return(0,a.default)(d,u),(0,t.default)(d,[{key:"componentWillReceiveProps",value:function(e){var t=this;if(e.data&&e.data!==this.props.data){this.setState({src:""});var r=new Image;r.src=e.data.l,r.onload=function(){return t.setState({src:e.data.l})},this.hasEventListener||(console.log("adding listener"),document.addEventListener("keydown",this.handleKey,!1),console.log("added listener"),this.hasEventListener=!0)}!e.data&&this.hasEventListener&&(console.log("removing listener"),document.removeEventListener("keydown",this.handleKey,!1),this.hasEventListener=!1)}},{key:"render",value:function(){var e=this.props,t=e.data,r=e.back,l=e.next,a=e.close;return t&&(0,i.h)("div",{className:"glry-lightbox"},this.state.src?(0,i.h)("img",{src:this.state.src}):(0,i.h)("div",{className:"glry-lightbox-loading"},(0,i.h)(o.Loader,{className:"glry-lightbox-loading-icon",color:"#fff"})),(0,i.h)("button",{className:"glry-button glry-back",onClick:r},(0,i.h)(o.Left,null)),(0,i.h)("button",{className:"glry-button glry-next",onClick:l},(0,i.h)(o.Right,null)),(0,i.h)("button",{className:"glry-button glry-close",onClick:a},(0,i.h)(o.Close,null)))}}]),d}(i.Component),c=d;exports.default=c;
},{"@babel/runtime/helpers/classCallCheck":"ZBnv","@babel/runtime/helpers/createClass":"No+o","@babel/runtime/helpers/possibleConstructorReturn":"GF/C","@babel/runtime/helpers/getPrototypeOf":"9WQg","@babel/runtime/helpers/inherits":"9qng","@babel/runtime/helpers/assertThisInitialized":"VmQe","@babel/runtime/helpers/defineProperty":"xwXl","preact":"qWa+","./icons":"wR74"}],"bV2w":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var e=d(require("@babel/runtime/regenerator")),t=d(require("@babel/runtime/helpers/asyncToGenerator")),r=d(require("@babel/runtime/helpers/toConsumableArray")),a=d(require("@babel/runtime/helpers/classCallCheck")),n=d(require("@babel/runtime/helpers/createClass")),u=d(require("@babel/runtime/helpers/possibleConstructorReturn")),i=d(require("@babel/runtime/helpers/getPrototypeOf")),s=d(require("@babel/runtime/helpers/inherits")),l=d(require("@babel/runtime/helpers/assertThisInitialized")),o=d(require("@babel/runtime/helpers/defineProperty")),c=require("preact");require("whatwg-fetch");var f=d(require("./Image")),h=d(require("./Lightbox"));function d(e){return e&&e.__esModule?e:{default:e}}var p=function(d){function p(){var e,t;(0,a.default)(this,p);for(var n=arguments.length,s=new Array(n),c=0;c<n;c++)s[c]=arguments[c];return t=(0,u.default)(this,(e=(0,i.default)(p)).call.apply(e,[this].concat(s))),(0,o.default)((0,l.default)((0,l.default)(t)),"state",{images:(0,r.default)(Array(10)),currentLightbox:-1}),(0,o.default)((0,l.default)((0,l.default)(t)),"activate",function(e){t.setState({currentLightbox:e})}),(0,o.default)((0,l.default)((0,l.default)(t)),"rotateBack",function(){var e=t.state.currentLightbox-1;-1===e&&(e=t.state.images.length-1),t.activate(e)}),(0,o.default)((0,l.default)((0,l.default)(t)),"rotateNext",function(){var e=t.state.currentLightbox+1;e===t.state.images.length&&(e=0),t.activate(e)}),t}var b;return(0,s.default)(p,d),(0,n.default)(p,[{key:"componentDidMount",value:(b=(0,t.default)(e.default.mark(function t(){var r,a,n;return e.default.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,fetch("https://storage.googleapis.com/cardamonchai-galleries/".concat(this.props.id,"/index.json"));case 3:return r=e.sent,e.next=6,r.json();case 6:a=e.sent,n=a.images,this.setState({images:n}),e.next=14;break;case 11:e.prev=11,e.t0=e.catch(0),console.error(e.t0);case 14:case"end":return e.stop()}},t,this,[[0,11]])})),function(){return b.apply(this,arguments)})},{key:"render",value:function(){var e=this;return(0,c.h)("div",null,(0,c.h)("ul",{className:"glry-container"},this.state.images.map(function(t,r){return(0,c.h)(f.default,{data:t,handleClick:function(){return e.activate(r)}})})),(0,c.h)(h.default,{data:this.state.images[this.state.currentLightbox],close:function(){return e.activate(-1)},back:function(){return e.rotateBack()},next:function(){return e.rotateNext()}}))}}]),p}(c.Component),b=p;exports.default=b;
},{"@babel/runtime/regenerator":"8m4e","@babel/runtime/helpers/asyncToGenerator":"2fws","@babel/runtime/helpers/toConsumableArray":"03Yt","@babel/runtime/helpers/classCallCheck":"ZBnv","@babel/runtime/helpers/createClass":"No+o","@babel/runtime/helpers/possibleConstructorReturn":"GF/C","@babel/runtime/helpers/getPrototypeOf":"9WQg","@babel/runtime/helpers/inherits":"9qng","@babel/runtime/helpers/assertThisInitialized":"VmQe","@babel/runtime/helpers/defineProperty":"xwXl","preact":"qWa+","whatwg-fetch":"MScu","./Image":"OnDc","./Lightbox":"9HQL"}],"H99C":[function(require,module,exports) {
"use strict";Object.defineProperty(exports,"__esModule",{value:!0}),Object.defineProperty(exports,"default",{enumerable:!0,get:function(){return e.default}});var e=r(require("./Glry"));function r(e){return e&&e.__esModule?e:{default:e}}
},{"./Glry":"bV2w"}],"zWu8":[function(require,module,exports) {
"use strict";var e=require("preact"),r=t(require("./src"));function t(e){return e&&e.__esModule?e:{default:e}}document.addEventListener("DOMContentLoaded",function(t){document.querySelectorAll("[data-glry]").forEach(function(t){var n=t.dataset.glry;(0,e.render)((0,e.h)(r.default,{id:n}),t)})});
},{"preact":"qWa+","./src":"H99C"}]},{},["zWu8"], null)
//# sourceMappingURL=/glry.map
sx.build({
    name: 'Article',
    nsp: 'carda',
    parent: sx.Plugin,

    m: {
        init: function () {
            window.scrollTo(0,0);
//            this.el.find('.sharedaddy').clone().prependTo(this.socialTarget);
        }
    }
});
console.log('cookie');

sx.build({
  name: 'Cookie',
  nsp: 'carda',
  parent: sx.Plugin,

  m: {
    setCookie: function() {
      expiry = new Date();
      expiry.setTime(expiry.getTime() + 365 * 24 * 60 * 60 * 1000); // Ten minutes
      document.cookie = 'consent=yes; path=/; expires=' + expiry.toGMTString();
    },

    init: function() {
      console.log(document.cookie.indexOf('consent='));
      if (document.cookie.indexOf('consent=') === -1) {
        this.el.show();
        this.setCookie();
      }
      this.el.click(this.close.bind(this));
    },

    close: function() {
      this.el.hide();
      this.setCookie();
    },
  },
});

sx.e = function(nsp, action) {
    ga('send', 'event', nsp, action);
};
(function (doc, $) {
    var loaded = false;

    function loadFacebook() {
        if (!loaded) {
            var js, fjs = doc.getElementsByTagName('script')[0];
            if (doc.getElementById('facebook-jssdk')) {
                return;
            }
            js = doc.createElement('script');
            js.id = 'facebook-jssdk';
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);

            loaded = true;
        }
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1254825647866255',
            xfbml: true,
            version: 'v2.5'
        });

        $(window).trigger('facebook-available');
    };

    sx.build({
        name: 'Facebook',
        nsp: 'carda',
        parent: sx.Plugin,

        m: {
            visible: false,
            init: function () {
                this.el.on('mouseenter', loadFacebook);
                this.el.on('click', this.onFacebookClick.bind(this));
                $(window).on('facebook-available', this.onFacebookAvailable.bind(this));
            },
            onFacebookAvailable: function() {
                window.setTimeout(function() {
                    this.el.addClass('available');
                    sx.e('facebook', 'available');
                }.bind(this), 500);
            },
            onFacebookClick: function() {
                sx.e('facebook', 'click');
            }
        }
    });
})(document, jQuery);

sx.build({
  name: 'InfiniteScroll',
  nsp: 'carda',
  parent: sx.Plugin,
  m: {
    count: 0,
    init: function() {
      var self = this;

      self.relayout();
      jQuery('body').on('articles-loaded', function(ev, data) {
        self.relayout();
      });
      jQuery('body').on('post-load', function (ev, data) {
        self.relayout();
      });
    },

    relayout: function(runs) {
      this.el.find('.placeholder').remove();
      this.el.append('<article class="placeholder"></article>');
      this.el.append('<article class="placeholder"></article>');
      this.el.append('<article class="placeholder"></article>');
      this.el.append('<article class="placeholder"></article>');
    }
  }
});

(function(window, $) {
  var $w = $(window);
  sx.build({
    name: 'FlickrGallery',
    nsp: 'smartr',
    parent: sx.Plugin,
    cfg: {
      lineHeight: 320,
      padding: 10,
      border: 2,
    },
    /** @namespace this.imageEl */
    m: {
      init: function() {
        var id = (this.id =
          'flickrApi' + parseInt(Math.random() * 10000 + new Date()));
        window[id] = function(response) {
          if (response.stat == 'ok') {
            $(window).trigger('incoming-' + id, response);
          } else {
            sx.e('flickr', 'meta-load-error');
          }
        };
        $w.on('incoming-' + id, $.proxy(this.onResponse, this));
        $w.on('resize scroll', $.proxy(this.checkForNextPage, this));
        this.currentPage = 1;
        this.images = [];
        this.visibleImages = [];
        this.width = this.el.width();
        this.retrieve();
        this.space = 2 * this.cfg.padding + 2 * this.cfg.border;
      },

      checkForNextPage: function() {
        var lastImage = this.images[this.images.length - 1];
        if (
          !this.retrieving &&
          lastImage.appended &&
          this.hasMorePages &&
          lastImage.outerEl.offset().top < $w.scrollTop() + $w.height()
        ) {
          this.retrieve();
        }
      },

      retrieve: function() {
        if (!this.retrieving) {
          this.retrieving = true;
          var url =
            'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09cf08983f8f2c5e24f90d9fd616af24&user_id=99929697%40N07&tags=' +
            this.tag +
            '&format=json&sort=date-taken-asc&per_page=70&page=' +
            this.currentPage +
            '&jsoncallback=' +
            this.id;
          $.get(url);
        }
      },

      onResponse: function(ev, data) {
        var images = data.photos.photo.map(function(photo) {
            return {
              url:
                'https://farm' +
                photo.farm +
                '.staticflickr.com/' +
                photo.server +
                '/' +
                photo.id +
                '_' +
                photo.secret,
              loaded: false,
              appended: false,
            };
          }),
          self = this;
        this.hasMorePages = data.photos.page < data.photos.pages;
        this.currentPage = data.photos.page + 1;

        images.forEach(function(image) {
          try {
            if (typeof image.url === 'string') {
              image.el = $('<img src="' + image.url + '_z.jpg">')
                .load(function() {
                  image.loaded = true;
                  self.layout();
                })
                .css({
                  margin: self.cfg.padding,
                  'border-width': self.cfg.border,
                });
              var aEl = $('<a href="' + image.url + '_b.jpg">')
                .append(image.el)
                .fancybox({
                  openEffect: 'elastic',
                  openSpeed: 250,
                  openEasing: 'swing',
                  hideOnContentClick: true,
                  margin: [5, 5, 5, 5],
                });
              image.outerEl = $('<div class="outer-image"/>').append(aEl);
            }
          } catch (e) {
            console.error(e);
            sx.e('flickr', 'image-load-error');
          }
          self.images.push(image);
        });
        this.retrieving = false;
      },

      draw: function(widthChanged) {
        var newWidth = this.el.width();
        if (widthChanged && this.width !== newWidth) {
          this.layout();
        }
      },

      layout: function() {
        var i,
          image,
          currentLineId = 0,
          lines = [],
          self = this,
          maxWidth = this.el.width();

        //alle bilder durchgehen, die geladenen identifizieren und ggf. appenden
        for (i = 0; i < this.images.length; i++) {
          image = this.images[i];
          if (image.loaded) {
            if (!image.appended) {
              this.el.append(image.outerEl);
              this.visibleImages.push(image);
              image.width = image.el.width();
              image.height = image.el.height();
              image.ratio = image.el.width() / image.el.height();
              image.appended = true;
            }
          } else {
            break;
          }
        }

        //alle geladenen images mit neuen breiten und höhen versehen
        for (i = 0; i < this.visibleImages.length; i++) {
          image = this.visibleImages[i];
          if (!lines[currentLineId]) {
            lines[currentLineId] = {
              width: 0,
              images: [],
            };
          }
          lines[currentLineId].images.push(image);
          lines[currentLineId].width +=
            image.ratio * this.cfg.lineHeight + this.space;
          if (lines[currentLineId].width > maxWidth) {
            currentLineId++;
          }
        }

        lines.forEach(function(line) {
          self.renderLine(line, maxWidth);
        });
      },

      renderLine: function(line, maxWidth) {
        var lineSpace = line.images.length * this.space,
          factor =
            line.width > maxWidth
              ? (maxWidth - lineSpace) / (line.width - lineSpace)
              : 1,
          self = this,
          h = Math.floor(self.cfg.lineHeight * factor),
          w,
          sum = 0;
        line.images.forEach(function(image) {
          w = Math.floor(image.ratio * h);
          sum += w + self.space;
          image.el.width(w).height(h);
          image.outerEl.css('float', 'left');
        });
        if (factor != 1) {
          line.images[line.images.length - 1].outerEl.css('float', 'right');
        }
      },
    },
  });
})(this, jQuery);

sx.build({
  name: 'Trigger',
  nsp: 'carda',
  parent: sx.Plugin,

  m: {
    init: function() {
      this.el.click(this.handleClick.bind(this));
    },
    handleClick: function() {
      console.log(this.target);
      this.target.toggleClass(this.classname);
    }
  }
});

sx.build({
  name: 'Twitter',
  nsp: 'carda',
  parent: sx.Plugin,

  m: {
    loaded: true,
    init: function() {
      this.el.prop('id', 'twitterfetcher');
      twitterFetcher.fetch({
        id: '690931036302249984',
        domId: 'twitterfetcher',
        maxTweets: 6,
        enableLinks: true,
        lang: 'de',
        showPermalinks: true,
      });
    },
  },
});

jQuery(function() {
  sx.nsp('cardatheme');
  cardatheme.app = new sx.Application();
  cardatheme.app.run();

  jQuery('body').on('contextmenu', function(ev) {
    if (jQuery(ev.target).is('img')) {
      ev.preventDefault();
    }
  });
});

// Google Analytics
(function(i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  (i[r] =
    i[r] ||
    function() {
      (i[r].q = i[r].q || []).push(arguments);
    }),
    (i[r].l = 1 * new Date());
  (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m);
})(window, document, 'script', '//www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-60141291-1', 'auto');
ga('set', 'anonymizeIp', true);
ga('send', 'pageview');
