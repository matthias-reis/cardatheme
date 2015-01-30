<div class="article-list main-col" typeof="sx:carda.Masonry">
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
            <?php get_template_part('app/article', 'list'); ?>
    <?php endwhile; ?>

    <?php else: ?>
        <article>
            <h2><?php _e('Sorry, nothing to display.', 'html5blank'); ?></h2>
        </article>
    <?php endif; ?>
</div>
