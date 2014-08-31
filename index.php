<?php get_header(); ?>

<main role="main">
    <?php if (is_single()): ?>
        <?php get_template_part('app/single'); ?>
    <?php else: ?>
        <section class="<?php if (is_home()): ?>home<?php endif;?> col-xs-12 col-md-8 col-lg-9">
            <?php get_template_part('app/loop'); ?>
        </section>
        <aside class="col-xs-12 col-md-4 col-lg-3">
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
