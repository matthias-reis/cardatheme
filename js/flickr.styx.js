sx.build({
    name: 'FlickrGallery',
    nsp: 'smartr',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {

            $(window).on('incoming-flickr-data', $.proxy(this.onResponse, this));

//            Schlüssel:
//                09cf08983f8f2c5e24f90d9fd616af24
//
//            Geheimer
//            Schlüssel:
//                499f4c458bf1fb8e
            var url = 'https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=09cf08983f8f2c5e24f90d9fd616af24&user_id=99929697%40N07&tags=' + this.tag + '&format=json';
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
                    var imgEl = $('<img src="' + url + '_n.jpg">').data('large', url + '_b.jpg').click(function (ev) {
                        self.enlarge($(ev.currentTarget).data('large'));
                    });
                    var innerEl = $('<div class="inner-image"/>').append(imgEl);
                    var outerEl = $('<div class="outer-image"/>').append(innerEl);
                    this.el.append(outerEl);
                }
            }
        },
        enlarge: function(url) {
            console.log(url);
            var enlargedEl = $('<img src="' + url + '">').css({'position': 'fixed','top': '0','left': '0', 'z-index': 10000});
            enlargedEl.click(function () {
               enlargedEl.remove();
            });
            $('body').append(enlargedEl);
        }

    }
});

function jsonFlickrApi(response) {
    if(response.stat == 'ok') {
        $(window).trigger('incoming-flickr-data', response);
    }
}