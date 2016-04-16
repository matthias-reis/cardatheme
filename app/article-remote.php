<section class="remote-content">
  <header class="ribbon ribbon-main headline">
    <div class="row inner-headline">
      <hgroup>
        <h4 class="super">
          Anne in anderen Weblogs
        </h4>

        <h1>
          <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
            <?php the_title(); ?>
          </a>
        </h1>
      </hgroup>
    </div>
  </header>
  <section class="article-text ribbon">
    <div class="row hyphenate">
      <?php
        $custom = get_post_custom();
        $url = $custom['url'][0];
        $desc = $custom['desc'][0];
      ?>
      <div class="description"><?php echo $desc; ?></div>
      <a class="link" href="<?php echo $url; ?>" target="_blank">
        <i>&rarr; Zu "<?php the_title(); ?>" wechseln</i>
        <?php if (has_post_thumbnail()) : ?>
          <?php the_post_thumbnail(); ?>
        <?php endif; ?>
      </a>

      </div>
    </div>
  </section>
</section>
