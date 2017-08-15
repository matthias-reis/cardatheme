<header class="article-headline article-ribbon">
  <div class="row">
    <h4>
      ANNE IN ANDEREN BLOGS publiziert am <?php the_date();?>
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