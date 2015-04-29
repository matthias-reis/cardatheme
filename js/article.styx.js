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