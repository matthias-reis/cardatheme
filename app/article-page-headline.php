<header class="article-headline article-ribbon">
  <div class="row">
    <div class="hdflex">
        <?php if (has_post_thumbnail()) : ?>
          <div class="article-thumbnail">
            <?php the_post_thumbnail('large', ['sizes' => '400px']); ?>
          </div>
        <?php endif; ?>
        <div class="hd">
          <h1>
            <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
              <?php the_title(); ?>
            </a>
          </h1>

          <?php if (c_has_subhead()) : ?>
            <h2><?php c_the_subhead(); ?></h2>
          <?php endif; ?>
        </div>
      </div>
  </div>
</header>