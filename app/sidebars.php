<aside class="ribbon ribbon-dark sidebars" typeof="sx:carda.Aside">
    <ul>
        <li class="social-icon">carda<b>social</b></li>
        <li class="nav-icon">carda<b>content</b></li>
        <li class="links-icon">carda<b>friends</b></li>
    </ul>

    <section class="sidebar social initial-hide row" property="sidebarEls">
        <h2>carda<b>social</b></h2>
        <?php if (is_active_sidebar('social_widgets')) : ?>
            <?php dynamic_sidebar('social_widgets'); ?>
        <?php endif; ?>
    </section>

    <section class="sidebar nav initial-hide row" property="sidebarEls">
        <h2>carda<b>content</b></h2>
        <?php if (is_active_sidebar('content_widgets')) : ?>
            <?php dynamic_sidebar('content_widgets'); ?>
        <?php endif; ?>
    </section>

    <section class="sidebar links initial-hide row" property="sidebarEls">
        <h2>carda<b>friends</b></h2>
        <?php if (is_active_sidebar('link_widgets')) : ?>
            <?php dynamic_sidebar('link_widgets'); ?>
        <?php endif; ?>
    </section>
</aside>

<?php if (is_home()) : ?>
    <?php if (is_active_sidebar('cite_widgets')) : ?>
        <aside class="ribbon ribbon-darker cite">
            <section class="row">
                <h3>carda<b>cite</b></h3>
                <h5>Das Zitat der Woche</h5>
                <?php dynamic_sidebar('cite_widgets'); ?>
            </section>
        </aside>
    <?php endif; ?>
<?php endif; ?>
