<header class="row" role="banner">

    <div class="col-xs-12 col-md-8 col-lg-9">
        <hgroup>
            <h3>Anne bloggt</h3>

            <h1><?php bloginfo('name') ?></h1>

            <h2><?php bloginfo('description') ?></h2>
        </hgroup>

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