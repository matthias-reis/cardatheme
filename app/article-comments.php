<div id="kommentare"></div>
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



<div class="tags">
  <section>
    <h3>Erschienen in</h3>
    <p><?php the_category(' '); ?></p>
  </section>

  <section>
    <h3>Getaggt mit</h3>
    <p><?php the_tags('', ' ', ''); ?></p>
  </section>

</div>

<div id="newsletter"></div>
<div id="mc_embed_signup" class="inline-newsletter">
  <form  id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
    <div id="mc_embed_signup_scroll">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125"><path fill="currentColor" d="M81.4 41.1l-5.6-4.7V29h-9.5L52.3 18a4.3 4.3 0 0 0-5.2 0L33.3 29.1h-9.7v7.7l-5 4.3c-1.2 1-2 3-2 4.5v33.7c0 2 1.6 3.7 3.6 3.7h59.6c2 0 3.7-1.7 3.7-3.7V45.6c0-1.6-.9-3.4-2-4.5zm-5.6.2l3 2.6-3 2.4v-5zM49.4 20.8h.6L60.4 29H39.2l10.2-8.3zm-22 12H72v16.4L58.6 59.8l-4.8-3.7H60v-1.9h-8.7l-1.7-1.4-1.2 1-3 2.3V45.5H29.9v5.3l-2.5-2v-16zm16.2 14.7v10.3l-2.3 1.8H41L36.3 56l-4.5-3.6v-5h11.8zm-20-5.8v4.2l-2.5-2 2.5-2.2zm-3.4 35V47.9L34 59l4.1 3.3-17.9 14.5zm2.7 2.6l26.8-21.7 27.7 21.7H22.9zm56.9-2.9L61.6 62.2l18.2-14.3v28.5zm-31.4-28h20v-3h-20v3zm20.1-10.7H30v3.7h38.5v-3.7zM48.5 52H65v-1.9H48.5v1.9z"/></svg>
      <a style="text-align: center" target="_blank" class="button" href="https://mailchi.mp/94bdbb6fded3/cardamonchai">Jetzt zum Newsletter anmelden</a>
    </div>
  </form>
</div>