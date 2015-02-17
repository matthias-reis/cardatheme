sx.build({
    name: 'Background',
    nsp: 'carda',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {
            this.el.show();
            this.draw();
            this.adminBarHeight = $('#wpadminbar').length > 0 ? 32 : 0;
        },

        draw: function () {
            var screenW = window.innerWidth,
                screenH = window.innerHeight - this.adminBarHeight,
                screenR = screenW/screenH,
                imageW = this.imageEl.attr('width'),
                imageH = this.imageEl.attr('height'),
                imageR = imageW/imageH,
                w,
                h,
                offsetT,
                offsetL;


            if (screenR > imageR){
                //Screen breiter als Bild
                w = screenW;
                h = screenW / imageR;
                offsetL = 0;
                offsetT = parseInt((h - screenH) / 2);
            } else {
                h = screenH;
                w = screenH * imageR;
                offsetT = 0;
                offsetL = parseInt((w - screenW) / 2);
            }

            this.el.width(screenW).height(screenH);
            this.imageEl.width(w).height(h).css({
                'position': 'relative',
                'top': '-' + offsetT + 'px',
                'left': '-' + offsetL + 'px'
            });
        }
    }
});