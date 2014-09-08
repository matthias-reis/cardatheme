<div class="bg" style="display: none" typeof="sx:sx.Background">
    <img property="imageEl" src="<?php header_image(); ?>"
         height="<?php echo get_custom_header()->height; ?>"
         width="<?php echo get_custom_header()->width; ?>" alt="" />
</div>

<header class="row" role="banner">
    <div class="col-xs-12 col-md-8 col-lg-9">
        <a href="/" title="Anne bloggt Cardamonchai ... Homepage">
            <hgroup>
                <h3>Anne bloggt</h3>

                <h1><?php bloginfo('name') ?></h1>

                <h2><?php bloginfo('description') ?></h2>
            </hgroup>
        </a>

        <nav class="nav-main" role="navigation">
            <?php c_create_navigation('header-menu'); ?>
        </nav>
    </div>

    <div class="col-xs-12 col-md-4 col-lg-3">
        <nav class="nav-meta hidden-xs hidden-sm">
            <?php c_create_navigation('meta-menu'); ?>
        </nav>
        <div class="search">
            <?php get_search_form( true );?>
        </div>
    </div>

</header>
