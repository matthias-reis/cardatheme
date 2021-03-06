<header class="article-headline article-gallery-headline article-ribbon">
  <div class="row">
    <h4>
      <?php if(!is_page()): ?>
        <?php echo ucfirst(c_get_type());?> vom <?php the_date();?>
      <?php endif; ?>
    </h4>

    <h1>
      <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
        <?php the_title(); ?>
      </a>
    </h1>

    <?php if (c_has_subhead()) : ?>
      <h2><?php c_the_subhead(); ?></h2>
    <?php endif; ?>
  </div>
</header>