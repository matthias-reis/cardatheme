
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
          </div>


      </aside>

      <?php if (is_home()) : ?>
        <?php if (is_active_sidebar('cite_widgets')) : ?>
          <aside class="ribbon sidebar ribbon-light cite">
            <section class="row">
              <h3>Weise Worte</h3>
            </section>
          </aside>
        <?php endif; ?>
      <?php endif; ?>
