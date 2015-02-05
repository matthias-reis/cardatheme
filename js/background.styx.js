sx.build({
    name: 'Background',
    nsp: 'carda',
    parent: sx.Plugin,

    /** @namespace this.imageEl */
    m: {
        init: function () {
            this.el.show();
            this.draw();
        },

        draw: function () {
            var screenW = window.innerWidth,
                screenH = window.innerHeight,
                elH = screenH,
                screenR = screenW/elH,
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
                offsetT = parseInt((h - elH) / 2);
            } else {
                h = elH;
                w = elH * imageR;
                offsetT = 0;
                offsetL = parseInt((w - screenW) / 2);
            }

            this.el.width(screenW).height(elH);
            this.imageEl.width(w).height(h).css({
                'position': 'relative',
                'top': '-' + offsetT + 'px',
                'left': '-' + offsetL + 'px'
            });
        }
    }
});