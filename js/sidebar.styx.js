sx.build({
    name: 'Sidebar',
    nsp: 'carda',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {
            this.el.click($.proxy(this.onClick, this));
            this.els = this.el.parent().children();
            this.sectionEl = this.el.parent().parent();

            if(!this.sectionEl.data('layouted') === true) {
                var sectionEls = this.sidebars.eq(1).find('section');
                sectionEls.eq(2).wrap('<section/>').append(sectionEls.eq(3));
                this.sectionEl.data('layouted', true);
            }
            $('body').on('contextmenu', function(ev) {
                if($(ev.target).is('img')) {
                    ev.preventDefault();
                }
            });
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
