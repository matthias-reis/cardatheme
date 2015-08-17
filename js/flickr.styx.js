sx.build({
    name: 'FlickrGallery',
    nsp: 'smartr',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {

            $(window).on('incoming-flickr-data', $.proxy(this.onResponse, this));

            // Schlüssel: 09cf08983f8f2c5e24f90d9fd616af24
            // Geheimer Schlüssel: 499f4c458bf1fb8e

            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09cf08983f8f2c5e24f90d9fd616af24&user_id=99929697%40N07&tags=' +
                this.tag +
                '&format=json&sort=date-taken-asc';
            $.get(url);
        },

        onResponse: function (ev, data) {
            var urls = data.photos.photo.map(function (photo) {
                return 'https://farm' + photo.farm + '.staticflickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret;
            });
            var self = this;


            for(var i in urls) {
                if(typeof urls[i] === 'string' && urls.hasOwnProperty(i)) {
                    var url = urls[i];
                    var imgEl = $('<img src="' + url + '_n.jpg">').
                        load(function () {
                            if(self.el.isotope) {
                                self.el.isotope('layout');
                                self.relayout(1);
                            }
                        });
                    var aEl = $('<a href="' + url + '_b.jpg">').
                        append(imgEl).
                        data('fancybox-group', 'gallery').
                        fancybox({
                            openEffect: 'elastic',
                            openSpeed: 250,
                            openEasing: 'swing',
                            hideOnContentClick: true,
                            margin: [50, 50, 50, 50]
                        });
                    var innerEl = $('<div class="inner-image"/>').append(aEl);
                    var outerEl = $('<div class="outer-image"/>').append(innerEl);
                    this.el.append(outerEl);
                }
            }

            this.el.isotope({
                itemSelector: '.outer-image',
                layoutMode: 'masonry'
            }).isotope('layout');
        },

        relayout: function (runs) {
            var self = this;
            sx.utils.delay('isotope', function () {
                if (self.count < runs) {
                    self.count++;
                    self.el.isotope('layout');
                    self.relayout(runs);
                }
            }, 500);

        }

    }
});

function jsonFlickrApi(response) {
    if(response.stat == 'ok') {
        $(window).trigger('incoming-flickr-data', response);
    }
}