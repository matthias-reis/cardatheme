<section>
    <nav>
        <h2>cardasite</h2>
        <?php c_create_navigation('footer-menu'); ?>
    </nav>
</section>

<?php if (is_active_sidebar('footer_widgets')) : ?>
    <?php dynamic_sidebar('footer_widgets'); ?>
<?php endif; ?>
