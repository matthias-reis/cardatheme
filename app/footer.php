<footer role="contentinfo">

    <p>Hier folgt der Footer</p>

    <!-- copyright -->
    <p class="copyright">
        &copy; <?php echo date('Y'); ?> Copyright <?php bloginfo('name'); ?>. <?php _e('Powered by', 'html5blank'); ?>
        <a href="//wordpress.org" title="WordPress">WordPress</a> &amp; <a href="//html5blank.com" title="HTML5 Blank">HTML5
                                                                                                                       Blank</a>.
    </p>
    <!-- /copyright -->

    <?php get_template_part('app/js') ?>


</footer>