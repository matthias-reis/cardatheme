<nav class="header-menu">
    <?php c_create_navigation('header-menu'); ?>
</nav>
<header class="bg bg-s">
    <a href="/" title="Anne bloggt Cardamonchai ... Homepage">
        <img property="imageEl"
             src="<?php echo get_template_directory_uri();?>/img/bg-s.jpg" />
        <hgroup>
            <h1><?php bloginfo('name') ?></h1>
            <h2><?php bloginfo('description') ?></h2>
        </hgroup>
    </a>
</header>

<?php get_template_part('app/sidebars') ?>
