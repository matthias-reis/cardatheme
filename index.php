<!doctype html>
<html <?php language_attributes(); ?> class="no-js">
<?php get_template_part('app/head') ?>

<body <?php body_class(); ?>>

<div class="container">
    <?php get_template_part('app/header') ?>
    <?php get_template_part('app/content') ?>
</div>

<div class="footer-wrapper">
    <div class="container">
        <?php get_template_part('app/footer') ?>

    </div>
</div>

<?php get_template_part('app/scripts') ?>

</body>
</html>