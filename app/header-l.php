<nav class="header-menu">
    <?php c_create_navigation('header-menu'); ?>
</nav>
<header class="bg bg-l" typeof="sx:carda.Background" data-size="l">
    <a href="/" title="Anne bloggt Cardamonchai ... Homepage">
        <img property="imageEl"
             src="<?php echo get_template_directory_uri();?>/img/bg-l.jpg"
             width="1600"
             height="1000" />
        <hgroup>
            <h1><?php bloginfo('name') ?></h1>
            <h2><?php bloginfo('description') ?></h2>
        </hgroup>
    </a>
</header>

<?php get_template_part('app/sidebars') ?>
