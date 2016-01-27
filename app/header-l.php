<nav class="header-menu">
    <?php c_create_navigation('header-menu'); ?>
    <div class="fb" typeof="sx:carda.Facebook">
        <div class="fb-preview" property="previewEl">Facebook<br><span>Gefällt mir</span></div>
        <div class="fb-like" property="likeEl" class="fb-like" data-href="https://www.facebook.com/cardamonchai" data-layout="button_count" data-action="like" data-share="false"></div>
    </div>
</nav>
<header class="bg bg-l" typeof="sx:carda.Background">
    <a href="/" title="Anne bloggt cardamonchai ... Homepage">
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
