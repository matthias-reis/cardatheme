(function (doc, $) {
    var loaded = false;

    function loadFacebook() {
        if (!loaded) {
            var js, fjs = doc.getElementsByTagName('script')[0];
            if (doc.getElementById('facebook-jssdk')) {
                return;
            }
            js = doc.createElement('script');
            js.id = 'facebook-jssdk';
            js.src = "//connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);

            loaded = true;
        }
    }

    window.fbAsyncInit = function () {
        FB.init({
            appId: '1254825647866255',
            xfbml: true,
            version: 'v2.5'
        });

        $(window).trigger('facebook-available');
    };

    sx.build({
        name: 'Facebook',
        nsp: 'carda',
        parent: sx.Plugin,

        m: {
            visible: false,
            init: function () {
                this.el.on('mouseenter', loadFacebook);
                this.el.on('click', this.onFacebookClick.bind(this));
                $(window).on('facebook-available', this.onFacebookAvailable.bind(this));
            },
            onFacebookAvailable: function() {
                window.setTimeout(function() {
                    this.el.addClass('available');
                    sx.e('facebook', 'available');
                }.bind(this), 500);
            },
            onFacebookClick: function() {
                sx.e('facebook', 'click');
            }
        }
    });
})(document, jQuery);
