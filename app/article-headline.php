<header class="article-headline article-ribbon">
  <div class="row">
    <h4>
      <?php if(!is_page()): ?>
        <?php echo ucfirst(c_get_type());?> vom <?php the_date();?>
      <?php endif; ?>
    </h4>
    <div class="hdflex">
      <?php if (has_post_thumbnail()) : ?>
        <div class="article-thumbnail">
          <?php the_post_thumbnail('large'); ?>
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