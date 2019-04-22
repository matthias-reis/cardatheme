<?php get_template_part('app/article', 'remote-headline'); ?>

<section class="article-text article-ribbon article-remote">
  <div class="row">
    <?php
      $custom = get_post_custom();
      $url = $custom['url'][0];
      $desc = $custom['desc'][0];
    ?>
    <div class="description">
      <?php echo $desc; ?>
    </div>

    <a class="link" href="<?php echo $url; ?>" target="_blank">
      <i>&rarr; Zu "<?php the_title(); ?>" wechseln</i>
      <?php if (has_post_thumbnail()) : ?>
        <?php the_post_thumbnail(); ?>
      <?php endif; ?>
    </a>

    <div class="backlink">
      <a href="http://cardamonchai.com/andere-blogs">Zurück zur Übersicht</a>
    </div>

  </div>
</section>
