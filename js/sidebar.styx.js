sx.build({
    name: 'Sidebar',
    nsp: 'carda',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {
            this.el.click($.proxy(this.onClick, this));
        },

        onClick: function () {
            if(this.target.hasClass('initial-hide')){
                this.sidebars.addClass('initial-hide');
                this.target.removeClass('initial-hide');
            } else {
                this.target.addClass('initial-hide');
            }
        }

    }
});
