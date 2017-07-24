<?php get_header(); ?>

<main role="main<?php if (is_home()): ?> home<?php endif; ?><?php if (is_single()): ?> single<?php endif; ?> ">
    <?php if (is_single() || is_page()): ?>
        <?php get_template_part('app/single'); ?>
    <?php else: ?>
        <?php get_template_part('app/list'); ?>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
