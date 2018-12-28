sx.build({
  name: 'Twitter',
  nsp: 'carda',
  parent: sx.Plugin,

  m: {
    loaded: true,
    init: function() {
      this.el.prop('id', 'twitterfetcher');
      twitterFetcher.fetch({
        id: '690931036302249984',
        domId: 'twitterfetcher',
        maxTweets: 6,
        enableLinks: true,
        lang: 'de',
        showPermalinks: true,
      });
    },
  },
});
