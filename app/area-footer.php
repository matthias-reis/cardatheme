<div class="row">
    <nav class="col-xs-12 col-md-4 col-lg-3">
        <h2>cardasite</h2>
        <?php c_create_navigation('footer-menu'); ?>
    </nav>
    <?php if (is_active_sidebar('footer_widgets')) : ?>
        <?php dynamic_sidebar('footer_widgets'); ?>
    <?php endif;?>
</div>
