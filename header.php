<!doctype html>
<html <?php language_attributes(); ?> class="no-js">

<?php get_template_part('app/head') ?>

<body <?php body_class(); ?>>

<?php
if(is_home()){
    get_template_part('app/header-l');
} else {
    get_template_part('app/header-s');
}
?>