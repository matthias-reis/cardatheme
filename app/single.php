<?php if (have_posts()): while (have_posts()) : the_post(); ?>

    <?php if (c_is_type('galerie')): ?>
        <section class="full">
            <h1>Galerie</h1>
            <section class="col-xs-12 col-md-8 col-lg-9">
                <?php get_template_part('app/article', 'gallery'); ?>
            </section>

        </section>
    <?php else: ?>
        <aside class="col-xs-12 col-md-4 col-lg-3">
            <?php get_template_part('app/area', 'single'); ?>
        </aside>
    <?php endif; ?>




<?php endwhile; ?>

<?php else: ?>

    <!-- article -->
    <article>
        <h2><?php _e('Sorry, nothing to display.', 'html5blank'); ?></h2>
    </article>
    <!-- /article -->

<?php endif; ?>