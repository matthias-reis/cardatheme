<?php if (have_posts()): while (have_posts()) : the_post(); ?>

    <?php if (c_is_type('galerie')): ?>
        <section class="full">
            <section>
                <?php get_template_part('app/article', 'gallery'); ?>
            </section>
        </section>
    <?php else: ?>
        <section class="small-12 large-8 xlarge-9 columns">
            <?php get_template_part('app/article', 'single'); ?>
        </section>
        <aside class="small-12 large-4 xlarge-3 columns">
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