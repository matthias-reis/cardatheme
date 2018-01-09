<div class="header-wrapper">
  <header class="header" typeof="sx:carda.Background">
    <a class="header-logo" href="/" title="Anne bloggt cardamonchai ... Homepage">
      <img src="<?php echo get_template_directory_uri(); ?>/img/logo.svg" height="64" alt="Anne bloggt Cardamonchai Logo" />
      <hgroup>
          <h2><?php bloginfo('name') ?></h2>
          <h3><?php bloginfo('description') ?></h3>
      </hgroup>
    </a>
    <nav class="header-menu">
      <?php if (is_active_sidebar('category_nav')) : ?>
        <?php dynamic_sidebar('category_nav'); ?>
      <?php endif; ?>
      <div class="burger-icon"
          typeof="sx:carda.Trigger"
          data-target="$('.menu-bar')"
          data-classname="show">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path fill="currentColor" d="M2 6h28v6h-28zM2 14h28v6h-28zM2 22h28v6h-28z"></path>
        </svg>
      </div>
      <div class="search-icon <?php if (get_search_query() != '') {
                                echo 'active';
                              } ?>"
          typeof="sx:carda.Trigger"
          data-target="$('.search-bar')"
          data-classname="hide">
        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32">
          <path fill="currentColor" d="M31.008 27.231l-7.58-6.447c-0.784-0.705-1.622-1.029-2.299-0.998 1.789-2.096 2.87-4.815 2.87-7.787 0-6.627-5.373-12-12-12s-12 5.373-12 12 5.373 12 12 12c2.972 0 5.691-1.081 7.787-2.87-0.031 0.677 0.293 1.515 0.998 2.299l6.447 7.58c1.104 1.226 2.907 1.33 4.007 0.23s0.997-2.903-0.23-4.007zM12 20c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8z"></path>
        </svg>
        <span>Suche</span>
      </div>
    </nav>
  </header>
  <section class="search-bar <?php if (get_search_query() == '') {
                                echo 'hide';
                              } ?> row">
    <?php get_search_form(true); ?>
  </section>
  <section class="menu-bar row">
    <?php if (is_active_sidebar('category_nav')) : ?>
      <?php dynamic_sidebar('category_nav'); ?>
    <?php endif; ?>
  </section>
</div>
