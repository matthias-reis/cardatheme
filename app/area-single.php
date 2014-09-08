<?php get_template_part('app/logo'); ?>

<?php if (is_active_sidebar('aside_post_widgets')) : ?>
    <?php dynamic_sidebar('aside_post_widgets'); ?>
<?php endif;