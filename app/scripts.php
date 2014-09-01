<script src="<?php echo get_template_directory_uri() ?>/libs/jquery.min.js"></script>
<script src="<?php echo get_template_directory_uri() ?>/libs/styx.js"></script>
<script src="<?php echo get_template_directory_uri() ?>/js/background.styx.js"></script>
<script>
    jQuery(function () {
        sx.nsp('cardatheme');
        cardatheme.app = new sx.Application();
        cardatheme.app.run();
    });
</script>