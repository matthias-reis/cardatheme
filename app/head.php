<head>
    <meta charset="<?php bloginfo('charset'); ?>">

    <title><?php wp_title(); ?></title>

    <link href="//www.google-analytics.com" rel="dns-prefetch">

    <link rel="icon" type="image/x-icon" href="<?php echo get_template_directory_uri(); ?>/img/icons/cardaicon.ico?v=1">
    <link rel="icon" type="image/png" sizes="32x32" href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="<?php echo get_template_directory_uri(); ?>/img/icons/favicon-16x16.png">
    <link rel="apple-touch-icon" sizes="180x180" href="<?php echo get_template_directory_uri(); ?>/img/icons/apple-touch-icon.png">
    <link rel="manifest" href="<?php echo get_template_directory_uri(); ?>/img/icons/manifest.json">
    <link rel="mask-icon" href="<?php echo get_template_directory_uri(); ?>/img/icons/safari-pinned-tab.svg" color="#5bbad5">
    <meta name="theme-color" content="#ffffff">

    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no">

    <meta name="description" content="<?php bloginfo('description'); ?>">
    <meta name="google-site-verification" content="5QfgSmDjmWKGtsXLfeirHMiVgXSp99T7jdMpnnvILQ0" />
    <meta name="google-site-verification" content="0bzAuCnTXlrcFeB_nSHw0T4MWdVmHSvvynzkRgZYRpg" />
    <?php get_template_part('app/css')?>

    <?php wp_head(); ?>
</head>