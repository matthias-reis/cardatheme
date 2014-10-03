<?php get_template_part('app/logo'); ?>

<section class="sidebars">
    <?php if (is_active_sidebar('aside_list_widgets')) : ?>
        <?php dynamic_sidebar('aside_list_widgets'); ?>
    <?php endif; ?>
</section>

<section class="sidebars secondary">
    <?php if (is_active_sidebar('aside_widgets')) : ?>
        <?php dynamic_sidebar('aside_widgets'); ?>
    <?php endif;?>
</section>