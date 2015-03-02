sx.build({
    name: 'Sidebar',
    nsp: 'carda',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {
            this.el.click($.proxy(this.onClick, this));
            this.els = this.el.parent().children();
        },

        onClick: function (ev) {
            var el = $(ev.currentTarget);

            if(el.hasClass('active')) {
               this.els.removeClass('active');
            } else {
                this.els.removeClass('active');
                el.addClass('active');
            }

            if(this.target.hasClass('initial-hide')){
                this.sidebars.addClass('initial-hide');
                this.target.removeClass('initial-hide');
            } else {
                this.target.addClass('initial-hide');
            }
        }

    }
});
