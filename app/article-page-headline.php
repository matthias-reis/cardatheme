<header class="article-headline article-ribbon">
  <div class="row">
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