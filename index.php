<?php get_header(); ?>

<main role="main">
    <section class="<?php if (is_home()): ?>home<?php endif; ?><?php if (is_single()): ?> single<?php endif; ?> content">
        <?php if (is_single()): ?>
            <?php get_template_part('app/single'); ?>
        <?php else: ?>
            <?php get_template_part('app/loop'); ?>
        <?php endif; ?>
    </section>
</main>

<?php get_footer(); ?>
