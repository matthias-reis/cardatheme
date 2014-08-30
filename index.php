<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
    <?php get_template_part('app/head') ?>

    <body <?php body_class(); ?>>
        <?php get_template_part('app/header') ?>

        <div class="wrapper">
            <?php get_template_part('app/content') ?>
        </div>

        <?php get_template_part('app/footer') ?>
        <?php get_template_part('app/scripts.php') ?>
    </body>
</html>