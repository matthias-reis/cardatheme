<div class="aside">
  <h2>Ebenfalls bei cardamonchai.com</h2>
  <section class="aside-ribbon aside-ribbon-image aside-visual">
    <img class="aside-visual-image" alt="Anne bloggt Cardamonchai" src="<?php echo get_template_directory_uri() ?>/img/visual.jpg"/>
    <p class="links">
      <a href="/cardamonchai-blick-hinter-die-kulissen/">Autorin</a>
      <a href="/andere-blogs/">Publikationen</a>
      <a href="/mediakit/">Mediakit</a>
    </p>
    <?php if (is_active_sidebar('cite_widgets')) : ?>
      <?php dynamic_sidebar('cite_widgets'); ?>
    <?php endif; ?>
  </section>
  <section class="aside-ribbon aside-social">
    <h3>Netzwerk</h3>
    <ul>
      <li class="fb" typeof="sx:carda.Facebook">
        <div class="fb-preview" property="previewEl"><span>Facebook</span></div>
        <div class="fb-like" property="likeEl" class="fb-like" data-href="https://www.facebook.com/cardamonchai" data-layout="button_count" data-action="like" data-share="false"></div>
      </li>
      <li><a class="instagram" target="_blank" href="https://www.instagram.com/anne_reko/">Instagram</a></li>
      <li><a class="pinterest" target="_blank" href="http://pinterest.com/annereko/boards/">Pinterest</a></li>
      <li><a class="flickr" target="_blank" href="http://www.flickr.com/photos/99929697@N07/">Flickr</a></li>
      <li><a class="lastfm" target="_blank" href="http://www.lastfm.de/user/cardamon82">last.fm</a></li>
      <li><a class="tumblr" target="_blank" href="http://cardamonchai.tumblr.com/">Tumblr</a></li>
      <li><a class="google" target="_blank" href="https://plus.google.com/u/0/+AnneReiscardamonchai">Google+</a></li>
      <li><a class="bloglovin" target="_blank" href="http://www.bloglovin.com/blog/2889954/cardamonchai">Bloglovin</a></li>
    </ul>
  </section>

  <?php if (is_active_sidebar('aside_widgets')) : ?>
    <?php dynamic_sidebar('aside_widgets'); ?>
  <?php endif; ?>
  
  <section class="aside-ribbon aside-ribbon-bright aside-twitter-feed">
    <h3>Tweets</h3>
    <div class="feed" typeof="sx:carda.Twitter">
      Die aktuellen Twitternachrichten werden geladen ...
    </div>
  </section>

  <section class="aside-ribbon">
    <p class="links">
      <a href="/impressum/">Impressum</a>
      <a href="/datenschutz/">Datenschutz</a>
    </p>
    
  </section>
</div>