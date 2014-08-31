<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
    <?php get_template_part('app/head') ?>

    <body <?php body_class(); ?>>
        <div class="container" style="background: #ddd">
            <?php get_template_part('app/header') ?>
            <?php get_template_part('app/content') ?>
            <?php get_template_part('app/footer') ?>
            <?php get_template_part('app/scripts') ?>
        </div>

    </body>
</html>