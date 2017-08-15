sx.build({
  name: 'InfiniteScroll',
  nsp: 'carda',
  parent: sx.Plugin,

  m: {
    count: 0,
    init: function() {
      var self = this;

      self.relayout();
      jQuery('body').on('articles-loaded', function(ev, data) {
        self.relayout();
      });
    },

    relayout: function(runs) {
      this.el.find('.placeholder').remove();
      this.el.append('<article class="placeholder"></article>');
      this.el.append('<article class="placeholder"></article>');
      this.el.append('<article class="placeholder"></article>');
      this.el.append('<article class="placeholder"></article>');
    }
  }
});
