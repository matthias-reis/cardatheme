<aside class="logo">
    <img src="<?php echo get_template_directory_uri(); ?>/img/logo.jpg">
</aside>
<div class="article-list" typeof="sx:carda.Masonry">
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
            <?php get_template_part('app/article', 'list'); ?>
    <?php endwhile; ?>

    <?php else: ?>
        <article>
            <h2><?php _e('Sorry, nothing to display.', 'html5blank'); ?></h2>
        </article>
    <?php endif; ?>
</div>
