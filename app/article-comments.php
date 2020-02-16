<?php if (wp_get_current_user()->ID > 0): ?>
<div id="disqus_thread"></div>
<script>

var disqus_config = function () {
    this.page.url = '<?php echo get_permalink(); ?>';
    this.page.identifier = '<?php echo get_permalink(); ?>';
    this.page.title = '<?php the_title(); ?>';
};

(function(d) {
  var s = d.createElement('script');
  s.src = 'https://cardamonchai.disqus.com/embed.js';
  s.setAttribute('data-timestamp', +new Date());
  (d.body).appendChild(s);
})(document);
</script>
<noscript>Bitte aktiviere Javascript, um die <a href="https://disqus.com/?ref_noscript">Disqus-Kommentare</a> sehen zu können.</noscript>
<?php endif; ?>
