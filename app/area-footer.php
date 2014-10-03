<nav class="small-6 medium-4 columns">
    <h2>cardasite</h2>
    <?php c_create_navigation('footer-menu'); ?>
</nav>

<?php if (is_active_sidebar('footer_widgets')) : ?>
    <?php dynamic_sidebar('footer_widgets'); ?>
<?php endif;?>
