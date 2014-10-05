<?php get_template_part('app/logo'); ?>

<section class="sidebar top">
    <?php if (is_active_sidebar('top_widgets')) : ?>
        <?php dynamic_sidebar('top_widgets'); ?>
    <?php endif; ?>
</section>

<section class="sidebar nav">
    <?php if (is_active_sidebar('page_widgets')) : ?>
        <?php dynamic_sidebar('page_widgets'); ?>
    <?php endif; ?>
</section>

<section class="sidebar social">
    <?php if (is_active_sidebar('social_widgets')) : ?>
        <?php dynamic_sidebar('social_widgets'); ?>
    <?php endif; ?>
</section>

<section class="sidebar links">
    <?php if (is_active_sidebar('link_widgets')) : ?>
        <?php dynamic_sidebar('link_widgets'); ?>
    <?php endif; ?>
</section>