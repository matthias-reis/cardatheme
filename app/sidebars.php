<aside class="sidebars">
    <ul>
        <li class="social-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .social-sidebar')" data-sidebars="$('.sidebars .sidebar')">
            carda<b>social</b></li>
        <li class="nav-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .nav-sidebar')" data-sidebars="$('.sidebars .sidebar')">
            carda<b>content</b></li>
        <li class="links-icon" typeof="sx:carda.Sidebar" data-target="$('.sidebars .links-sidebar')" data-sidebars="$('.sidebars .sidebar')">
            carda<b>friends</b></li>
    </ul>

    <div class="ribbon ribbon-secondary">
        <section class="sidebar social-sidebar initial-hide row">
            <h3>carda<b>social</b></h3>
            <?php if (is_active_sidebar('social_widgets')) : ?>
                <?php dynamic_sidebar('social_widgets'); ?>
            <?php endif; ?>
        </section>

        <section class="sidebar nav-sidebar initial-hide row">
            <h3>carda<b>content</b></h3>
            <?php if (is_active_sidebar('content_widgets')) : ?>
                <?php dynamic_sidebar('content_widgets'); ?>
            <?php endif; ?>
        </section>

        <section class="sidebar links-sidebar initial-hide row">
            <h3>carda<b>friends</b></h3>
            <?php if (is_active_sidebar('link_widgets')) : ?>
                <?php dynamic_sidebar('link_widgets'); ?>
            <?php endif; ?>
        </section>
        <div style="clear:both"></div>
    </div>


</aside>

<?php if (is_home()) : ?>
    <?php if (is_active_sidebar('cite_widgets')) : ?>
        <aside class="ribbon sidebar ribbon-medium cite">
            <section class="row">
                <h3>carda<b>cite</b></h3>
                <h5>Das Zitat der Woche</h5>
                <?php dynamic_sidebar('cite_widgets'); ?>
            </section>
        </aside>
    <?php endif; ?>
<?php endif; ?>
