<?php get_template_part('app/logo'); ?>

<?php if (is_active_sidebar('aside_list_widgets')) : ?>
    <?php dynamic_sidebar('aside_list_widgets'); ?>
<?php endif;