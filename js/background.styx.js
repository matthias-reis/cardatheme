sx.build({
    name: 'Background',
    nsp: 'sx',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {
            this.info('Initializing');
            this.el.show();
            this.draw();
        },

        draw: function () {

            var screenW = window.innerWidth,
                screenH = window.innerHeight,
                screenR = screenW/screenH,
                imageW = this.imageEl.width(),
                imageH = this.imageEl.height(),
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

            this.el.width(screenW).height(screenH).css({
                'position': 'fixed',
                'top': 0,
                'left': 0
            });

            this.imageEl.width(w).height(h).css({
                'position': 'relative',
                'top': '-' + offsetT + 'px',
                'left': '-' + offsetL + 'px'
            });
        }
    }
});