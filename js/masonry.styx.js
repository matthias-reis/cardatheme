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

            $('body').on('articles-loaded', function (ev, data) {
                self.el.isotope('appended', data);
                Hyphenator.run();
                self.count = 0;
                self.relayout(12);
            });
        },

        relayout: function(runs) {
            var self = this;
            sx.utils.delay('isotope', function () {
                console.log('relayout ' + self.count);
                if(self.count < runs) {
                    self.count++;
                    self.el.isotope('layout');
                    self.relayout(runs);
                }
            }, 200);

        }
    }
});
