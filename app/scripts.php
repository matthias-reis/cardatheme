<script src="<?php echo get_template_directory_uri() ?>/assets/cardatheme.js"></script>
<script src="<?php echo get_template_directory_uri() ?>/js/Hyphenator/Hyphenator.js"></script>

<script type="text/javascript">
    Hyphenator.config({
        displaytogglebox: false,
        intermediatestate: 'visible'
    });
    Hyphenator.run();
</script>
<script>
    jQuery(function () {
        sx.nsp('cardatheme');
        cardatheme.app = new sx.Application();
        cardatheme.app.run();
    });
</script>

<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-60141291-1', 'auto');
  ga('send', 'pageview');

</script>