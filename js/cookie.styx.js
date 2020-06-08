sx.build({
  name: 'Cookie',
  nsp: 'carda',
  parent: sx.Plugin,

  m: {
    setCookie: function () {
      expiry = new Date();
      expiry.setTime(expiry.getTime() + 365 * 24 * 60 * 60 * 1000); // Ten minutes
      document.cookie = 'consent=yes; path=/; expires=' + expiry.toGMTString();
    },

    init: function () {
      if (document.cookie.indexOf('consent=') === -1) {
        this.el.show();
        this.setCookie();
      }
      this.el.click(this.close.bind(this));
    },

    close: function () {
      this.el.hide();
      this.setCookie();
    },
  },
});
