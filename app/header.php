<header class="row" role="banner">

    <div class="col-xs-12 col-md-8 col-lg-9">
        <hgroup>
            <h3>Anne bloggt</h3>

            <h1><?php bloginfo('name') ?></h1>

            <h2><?php bloginfo('description') ?></h2>
        </hgroup>

        <nav class="nav-main" role="navigation">
            <?php html5blank_nav(); ?>
        </nav>
    </div>

    <div class="col-xs-12 col-md-4 col-lg-3">
        <nav class="nav-meta hidden-xs hidden-sm">
            <ul>
                <li><a href="">cardabout</a></li>
                <li><a href="">cardacontact</a></li>
                <li><a href="">impressum</a></li>
            </ul>
        </nav>
        <div class="search">
            <?php get_search_form( true );?>
        </div>
    </div>


</header>