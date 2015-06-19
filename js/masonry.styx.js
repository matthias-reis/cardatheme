sx.build({
    name: 'Masonry',
    nsp: 'carda',
    parent: sx.Plugin,

    m: {
        count: 0,
        init: function () {
            var self = this;

            this.el.isotope({
                itemSelector: 'article',
                layoutMode: 'masonry'
            }).isotope('layout');
                self.relayout(5);
            $('body').on('articles-loaded', function (ev, data) {
                self.el.isotope('appended', data);
                Hyphenator.run();
                self.count = 0;
                self.relayout(5);
            });
        },

        relayout: function(runs) {
            var self = this;
            sx.utils.delay('isotope', function () {
                if(self.count < runs) {
                    self.count++;
                    self.el.isotope('layout');
                    self.relayout(runs);
                }
            }, 700);
        }
    }
});
