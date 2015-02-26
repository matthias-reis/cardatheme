sx.build({
    name: 'Masonry',
    nsp: 'carda',
    parent: sx.Plugin,

    m: {
        init: function () {
            var self = this;

            this.el.isotope({
                itemSelector: 'article',
                layoutMode: 'masonry'
            }).isotope('layout');

            sx.utils.delay('isotope', function () {
                self.el.isotope('layout');
            }, 200);

            $('body').on('articles-loaded', function (ev, data) {
                self.el.isotope('appended', data);
            });
        }
    }
});
