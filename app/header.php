<header class="header" typeof="sx:carda.Background">
  <a class="header-logo" href="/" title="Anne bloggt cardamonchai ... Homepage">
    <img src="<?php echo get_template_directory_uri();?>/img/logo.svg" height="64" />
    <hgroup>
        <h1><?php bloginfo('name') ?></h1>
        <h2><?php bloginfo('description') ?></h2>
    </hgroup>
  </a>
  <nav class="header-menu">
    <?php if (is_active_sidebar('category_nav')) : ?>
      <?php dynamic_sidebar('category_nav'); ?>
    <?php endif; ?>
    <div class="search-icon <?php if(get_search_query() != '') {echo 'active';}?>"
         typeof="sx:carda.SearchTrigger"
         data-target="$('.search-bar')">
      Suche</li>
  </nav>
</header>
<section class="search-bar <?php if (get_search_query() == '') {echo 'initial-hide';} ?> row">
  <?php get_search_form(true); ?>
</section>
