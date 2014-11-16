<nav class="header-menu">
    <?php c_create_navigation('header-menu'); ?>
</nav>
<aside class="bg" typeof="sx:carda.Background" data-foreground="$('body > header')">
    <img property="imageEl"
         src="<?php echo get_template_directory_uri();?>/img/bg-dubai.jpg"
         width="1600"
         height="1063" />
</aside>
<header>
    <a href="/" title="Anne bloggt Cardamonchai ... Homepage">
        <hgroup>
            <h1><?php bloginfo('name') ?></h1>
            <h2><?php bloginfo('description') ?></h2>
        </hgroup>
    </a>
</header>
