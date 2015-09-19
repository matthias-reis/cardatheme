(function (window, $) {
    var $w = $(window);
    sx.build({
        name: 'Lightbox',
        nsp: 'smartr',
        parent: sx.Helper,
        /** @namespace this.imageEl */
        m: {
            init: function (imageUrls, id) {
                console.log(arguments);
            }
        }
    });
})(this, jQuery);