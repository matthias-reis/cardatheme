sx.build({
    name: 'Sidebar',
    nsp: 'carda',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {
            this.el.click(jQuery.proxy(this.onClick, this));
            this.els = this.el.parent().children();
            this.sectionEl = this.el.parent().parent();

            if(!this.sectionEl.data('layouted') === true) {
                var sectionEls = this.sidebars.eq(1).find('section');
                sectionEls.eq(2).wrap('<section/>').append(sectionEls.eq(3));
                this.sectionEl.data('layouted', true);
            }
            jQuery('body').on('contextmenu', function(ev) {
                if(jQuery(ev.target).is('img')) {
                    ev.preventDefault();
                }
            });
        },


        onClick: function (ev) {
            var el = jQuery(ev.currentTarget);
            var name =jQuery(ev.currentTarget).data('name') || 'unknown';
            if(el.hasClass('active')) {
                this.els.removeClass('active');
                sx.e('sidebar', 'tab-close-' + name);
            } else {
                this.els.removeClass('active');
                el.addClass('active');
                sx.e('sidebar', 'tab-open-' + name);
                jQuery(window).trigger('tab-open-' + name);
            }

            if(this.target.hasClass('initial-hide')){
                this.sidebars.addClass('initial-hide');
                this.target.removeClass('initial-hide');
            } else {
                this.target.addClass('initial-hide');
            }

            jQuery('html, body').animate({
                scrollTop: this.el.offset().top - 120
            }, 500);
        }

    }
});
