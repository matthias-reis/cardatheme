(function (window, $) {
    var $w = $(window);
    sx.build({
        name: 'FlickrGallery',
        nsp: 'smartr',
        parent: sx.Plugin,
        cfg: {
            lineHeight: 320,
            padding: 10,
            border: 2
        },
        /** @namespace this.imageEl */
        m: {
            init: function () {
                var id = this.id = 'flickrApi' + parseInt(Math.random() * 10000 + new Date());
                window[id] = function (response) {
                    if (response.stat == 'ok') {
                        $(window).trigger('incoming-' + id, response);
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

            checkForNextPage: function () {
                var lastImage = this.images[this.images.length - 1];
                if (!this.retrieving && lastImage.appended && this.hasMorePages && lastImage.outerEl.offset().top < $w.scrollTop() + $w.height()) {
                    this.retrieve();
                }
            },

            retrieve: function () {
                if (!this.retrieving) {
                    this.retrieving = true;
                    var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09cf08983f8f2c5e24f90d9fd616af24&user_id=99929697%40N07&tags=' +
                        this.tag +
                        '&format=json&sort=date-taken-asc&per_page=70&page=' +
                        this.currentPage + '&jsoncallback=' +
                        this.id;
                    $.get(url);
                }
            },

            onResponse: function (ev, data) {
                var images = data.photos.photo.map(function (photo) {
                        return {
                            url: 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret,
                            loaded: false,
                            appended: false
                        };
                    }),
                    self = this;
                this.hasMorePages = data.photos.page < data.photos.pages;
                this.currentPage = data.photos.page + 1;

                images.forEach(function (image) {
                    try {
                        if (typeof image.url === 'string') {
                            image.el = $('<img src="' + image.url + '_z.jpg">').
                                load(function () {
                                    image.loaded = true;
                                    self.layout();
                                }).css({
                                    'margin': self.cfg.padding,
                                    'border-width': self.cfg.border
                                });
                            var aEl = $('<a href="' + image.url + '_b.jpg">').
                                append(image.el).
                                fancybox({
                                    openEffect: 'elastic',
                                    openSpeed: 250,
                                    openEasing: 'swing',
                                    hideOnContentClick: true,
                                    margin: [5, 5, 5, 5]
                                });
                            image.outerEl = $('<div class="outer-image"/>').append(aEl);
                        }
                    } catch (e) {
                        console.error(e);
                    }
                    self.images.push(image);
                });
                this.retrieving = false;
            },

            draw: function (widthChanged) {
                var newWidth = this.el.width();
                if (widthChanged && this.width !== newWidth) {
                    this.layout();
                }
            },

            layout: function () {
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
                            images: []
                        };
                    }
                    lines[currentLineId].images.push(image);
                    lines[currentLineId].width += image.ratio * this.cfg.lineHeight + this.space;
                    if (lines[currentLineId].width > maxWidth) {
                        currentLineId++;
                    }
                }

                lines.forEach(function (line) {
                    self.renderLine(line, maxWidth);
                });
            },

            renderLine: function (line, maxWidth) {
                var lineSpace = line.images.length * this.space,
                    factor = line.width > maxWidth ? (maxWidth - lineSpace) / (line.width - lineSpace) : 1,
                    self = this,
                    h = Math.floor((self.cfg.lineHeight) * factor),
                    w,
                    sum = 0;
                line.images.forEach(function (image) {
                    w = Math.floor(image.ratio * h);
                    sum += w + self.space;
                    image.el.width(w).height(h);
                    image.outerEl.css('float', 'left');
                });
                if (factor != 1) {
                    line.images[line.images.length - 1].outerEl.css('float', 'right');
                }
            }
        }
    });
})(this, jQuery);