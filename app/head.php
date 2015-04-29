<head>
    <meta charset="<?php bloginfo('charset'); ?>">

    <title><?php wp_title(); ?></title>

    <link href="//www.google-analytics.com" rel="dns-prefetch">

    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon.ico" rel="shortcut icon">
    <link href="<?php echo get_template_directory_uri(); ?>/img/icons/touch.png" rel="apple-touch-icon-precomposed">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <meta name="description" content="<?php bloginfo('description'); ?>">
    <meta name="google-site-verification" content="5QfgSmDjmWKGtsXLfeirHMiVgXSp99T7jdMpnnvILQ0" />
    <?php get_template_part('app/css')?>

    <?php wp_head(); ?>
</head>