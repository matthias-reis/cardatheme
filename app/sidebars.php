<aside class="sidebars">
  <ul>
    <li class="search-icon <?php if(get_search_query() != '') {echo 'active';}?>" typeof="sx:carda.Sidebar" data-name="search" data-target="$('.sidebars .search-sidebar')" data-sidebars="$('.sidebars .sidebar')">
      Suche</li>
      <li class="social-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .social-sidebar')" data-name="social" data-sidebars="$('.sidebars .sidebar')">
        Soziale Netzwerke</li>
        <li class="nav-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .nav-sidebar')" data-name="nav" data-sidebars="$('.sidebars .sidebar')">
          Inhalte & Archiv</li>
          <li class="links-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .links-sidebar')" data-name="links" data-sidebars="$('.sidebars .sidebar')">
            Links & Pinnwand</li>
          </ul>

          <div class="ribbon ribbon-medium">
            <section class="sidebar search-sidebar <?php if (get_search_query() == '') {echo 'initial-hide';} ?> row">
              <?php get_search_form(true); ?>
            </section>

            <section class="sidebar social-sidebar initial-hide row">
              <h3>Soziale Netzwerke</h3>

              <section class="twitter-feed">
                <h4>Anne bei Twitter</h4>
                <div class="feed" typeof="sx:carda.Twitter">
                  Die aktuellen Twitternachrichten werden geladen ...
                </div>
              </section>

              <?php if (is_active_sidebar('social_widgets')) : ?>
                <?php dynamic_sidebar('social_widgets'); ?>
              <?php endif; ?>

              <section class="more-social">
                <h4>Anne im Netz</h4>
                <ul>
                  <li class="fb" typeof="sx:carda.Facebook">
                    <div class="fb-preview" property="previewEl"><span>Facebook</span></div>
                    <div class="fb-like" property="likeEl" class="fb-like" data-href="https://www.facebook.com/cardamonchai" data-layout="button_count" data-action="like" data-share="false"></div>
                  </li>
                  <li><a class="pinterest" target="_blank" href="http://pinterest.com/annereko/boards/">Pinterest</a></li>
                  <li><a class="flickr" target="_blank" href="http://www.flickr.com/photos/99929697@N07/">Flickr</a></li>
                  <li><a class="lastfm" target="_blank" href="http://www.lastfm.de/user/cardamon82">last.fm</a></li>
                  <li><a class="tumblr" target="_blank" href="http://cardamonchai.tumblr.com/">Tumblr</a></li>
                  <li><a class="google" target="_blank" href="https://plus.google.com/u/0/+AnneReiscardamonchai">Google+</a></li>
                  <li><a class="bloglovin" target="_blank" href="http://www.bloglovin.com/blog/2889954/cardamonchai">Bloglovin</a></li>
                  <li><a class="visits" href="/">52.483 Besucher bisher</a></li>
                </ul>
              </section>
            </section>

            <section class="sidebar nav-sidebar initial-hide row">
              <h3>Inhalte & Archiv</h3>
              <?php if (is_active_sidebar('content_widgets')) : ?>
                <?php dynamic_sidebar('content_widgets'); ?>
              <?php endif; ?>
            </section>

            <section class="sidebar links-sidebar initial-hide row">
              <h3>Links & Pinnwand</h3>
              <section>
                <h4>Anne in anderen Blogs</h4>
                <ul>
                <?php
                  $args = array( 'post_type' => 'remote', 'posts_per_page' => 10 );
                  $loop = new WP_Query( $args );
                  while ( $loop->have_posts() ) {
                     $loop->the_post();
                     echo '<li><a href="';
                     the_permalink();
                     echo '">';
                     the_title();
                     echo '</a></li>';
                   }
                ?>
                </ul>
                <a href="/andere-blogs" class="sidebar-more-link">&rarr; alle Beiträge ansehen</a>
              </section>
              <section>
                <?php if (is_active_sidebar('link_widgets')) : ?>
                  <?php dynamic_sidebar('link_widgets'); ?>
                <?php endif; ?>
              </section>
              <section>
                <h4>Pinnwand</h4>
                <?php if (is_active_sidebar('pinboard_widgets')) : ?>
                  <?php dynamic_sidebar('pinboard_widgets'); ?>
                <?php endif; ?>
              </section>
            </section>
            <div style="clear:both"></div>
          </div>


      </aside>

      <?php if (is_home()) : ?>
        <?php if (is_active_sidebar('cite_widgets')) : ?>
          <aside class="ribbon sidebar ribbon-light cite">
            <section class="row">
              <h3>Weise Worte</h3>
              <?php dynamic_sidebar('cite_widgets'); ?>
            </section>
          </aside>
        <?php endif; ?>
      <?php endif; ?>
