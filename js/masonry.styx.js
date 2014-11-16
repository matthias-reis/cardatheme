sx.build({
    name: 'Masonry',
    nsp: 'carda',
    parent: sx.Plugin,

    m: {
        init: function () {
            this.el.isotope({
                itemSelector: 'article',
                layoutMode: 'masonry'
            });
        }
    }
});