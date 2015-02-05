<?php get_header(); ?>


<main role="main ribbon ribbon-bright<?php if (is_home()): ?> home<?php endif; ?><?php if (is_single()): ?> single<?php endif; ?> ">
    <?php if (is_single()): ?>
        <?php get_template_part('app/single'); ?>
    <?php else: ?>
        <?php get_template_part('app/headline'); ?>
        <?php get_template_part('app/loop'); ?>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
