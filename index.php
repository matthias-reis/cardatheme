<?php get_header(); ?>

<main role="main" class="row">
    <?php if (is_single()): ?>
        <?php get_template_part('app/single'); ?>
    <?php else: ?>
        <section class="<?php if (is_home()): ?>home<?php endif;?> small-12 large-8 xlarge-9 columns">
            <?php get_template_part('app/loop'); ?>
        </section>
        <aside class="small-12 large-4 xlarge-3 columns">
            <?php if (is_page()): ?>
                <?php get_template_part('app/area', 'page'); ?>
            <?php elseif (is_single()): ?>
                <?php get_template_part('app/area', 'single'); ?>
            <?php else: ?>
                <?php get_template_part('app/area', 'aside'); ?>
            <?php endif; ?>
        </aside>

    <?php endif; ?>
</main>

<?php get_footer(); ?>
