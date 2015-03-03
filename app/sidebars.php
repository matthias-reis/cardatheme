<aside class="sidebars">
    <ul>
        <li class="search-icon <?php if(get_search_query() != '') {echo 'active';}?>" typeof="sx:carda.Sidebar" data-target="$('.sidebars .search-sidebar')" data-sidebars="$('.sidebars .sidebar')">
            Suche</li>
        <li class="social-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .social-sidebar')" data-sidebars="$('.sidebars .sidebar')">
            Soziale Netzwerke</li>
        <li class="nav-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .nav-sidebar')" data-sidebars="$('.sidebars .sidebar')">
            Inhalte & Archiv</li>
        <li class="links-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .links-sidebar')" data-sidebars="$('.sidebars .sidebar')">
            Links & Pinnwand</li>
    </ul>

    <div class="ribbon ribbon-medium">
        <section class="sidebar search-sidebar <?php if (get_search_query() == '') {echo 'initial-hide';} ?> row">
            <?php get_search_form(true); ?>
        </section>

        <section class="sidebar social-sidebar initial-hide row">
            <h3>Soziale Netzwerke</h3>
            <?php if (is_active_sidebar('social_widgets')) : ?>
                <?php dynamic_sidebar('social_widgets'); ?>
            <?php endif; ?>
        </section>

        <section class="sidebar nav-sidebar initial-hide row">
            <h3>Inhalte & Archiv</h3>
            <?php if (is_active_sidebar('content_widgets')) : ?>
                <?php dynamic_sidebar('content_widgets'); ?>
            <?php endif; ?>
        </section>

        <section class="sidebar links-sidebar initial-hide row">
            <h3>Links & Pinnwand</h3>
            <?php if (is_active_sidebar('link_widgets')) : ?>
                <?php dynamic_sidebar('link_widgets'); ?>
            <?php endif; ?>
            <section>
                <h4>Pinnwand</h4>
                <?php if (is_active_sidebar('pinboard_widgets')) : ?>
                    <?php dynamic_sidebar('pinboard_widgets'); ?>
                <?php endif; ?>
            </section>
        </section>
        <div style="clear:both"></div>
    </div>


</aside>

<?php if (is_home()) : ?>
    <?php if (is_active_sidebar('cite_widgets')) : ?>
        <aside class="ribbon sidebar ribbon-light cite">
            <section class="row">
                <h3>Weise Worte</h3>
                <?php dynamic_sidebar('cite_widgets'); ?>
            </section>
        </aside>
    <?php endif; ?>
<?php endif; ?>
