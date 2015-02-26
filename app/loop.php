<div class="article-list main-col" id="infinite-scroll-container" typeof="sx:carda.Masonry">
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
        <?php get_template_part('app/article', 'list'); ?>
    <?php endwhile; ?>

    <?php else: ?>
        <article>
            <h2><?php _e('Sorry, nothing to display.', 'html5blank'); ?></h2>
        </article>
    <?php endif; ?>
</div>
<nav id="article-nav">
    <div>
        <?php posts_nav_link('', 'Neuere Beiträge laden', 'Weitere Beiträge laden'); ?>
    </div>
</nav>
