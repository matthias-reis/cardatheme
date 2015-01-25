<?php if (have_posts()): while (have_posts()) : the_post(); ?>
    <?php if (c_is_type('galerie')): ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('gallery-article'); ?>>
            <?php get_template_part('app/article', 'gallery'); ?>
        </article>
    <?php else: ?>
        <article id="post-<?php the_ID(); ?>" <?php post_class('single-article'); ?>>
            <?php get_template_part('app/article', 'single'); ?>
        </article>
    <?php endif; ?>
<?php endwhile; ?>

<?php else: ?>
    <section class="notfound ribbon ribbon-dark">
        <h2>Nichts gefunden</h2>
    </section>
<?php endif; ?>
</article>