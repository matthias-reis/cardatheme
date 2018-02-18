<?php


if (!isset($content_width)) {
  $content_width = 900;
}
if (function_exists('add_theme_support')) {
  // Add Menu Support
  add_theme_support('menus');
  // Add Thumbnail Theme Support
  add_theme_support('post-thumbnails');
  // Add Support for Custom Backgrounds - Uncomment below if you're going to use
  add_theme_support(
  'custom-header',
  array(
    'default-image' => get_template_directory_uri() . '/img/bg.jpg',
    'uploads' => true,
    'wp-head-callback' => 'c_custom_header',
    )
  );
  // Enables post and comment RSS feed links to head
  add_theme_support('automatic-feed-links');
  add_image_size('full', 960, '', true);
  add_image_size('large', 520, '', true);
  add_image_size('medium', 300, '', true);
  add_image_size('small', 200, '', true);
  add_image_size('title', '', 400, false);
  set_post_thumbnail_size('', 600, false);
  add_filter( 'jpeg_quality', create_function( '', 'return 70;' ) );
}

function c_custom_image_sizes($sizes) {
        
  $addsizes = array(
    'full' => 'volle Breite',
    'large' => 'groß (520px)',
    'medium' => 'mittel (300px)',
    'small' => 'klein (200px)'
  );
  $newsizes = array_merge($sizes, $addsizes);
  return $newsizes;
}

add_filter('image_size_names_choose', 'c_custom_image_sizes');

/*** CUSTOM FUNCTIONS ***/
add_action('init', 'c_setup');
function c_setup()
{
  register_nav_menus(
  array(
    'header-menu' => 'Hauptmenü',
    'meta-menu' => 'Metamenü',
    'footer-menu' => 'Footermenü'
  )
);
register_taxonomy(
'type',
'post',
array(
  'hierarchical' => true,
  'label' => 'Typ',
  'rewrite' => false,
  'show_ui' => true,
  'show_in_menu' => true,
  'show_in_nav_menus' => true,
  'show_admin_column' => true
)
);
}

add_action('widgets_init', 'c_create_sidebars');
function c_create_sidebars()
{
  register_sidebar(
    array(
      'name' => 'Kategorien',
      'id' => 'category_nav',
      'before_widget' => '<section>',
      'after_widget' => '</section>',
      'before_title' => '<h4>',
      'after_title' => '</h4>',
    )
  );
  register_sidebar(
    array(
      'name' => 'Seitenleiste',
      'id' => 'aside_widgets',
      'before_widget' => '<section class="aside-ribbon aside-widgets">',
      'after_widget' => '</section>',
      'before_title' => '<h3>',
      'after_title' => '</h3>',
    )
  );
  register_sidebar(
    array(
      'name' => 'Zitatbereich',
      'id' => 'cite_widgets',
      'before_widget' => '<section class="aside-ribbon-highlight aside-cite">',
      'after_widget' => '</section>',
      'before_title' => '<h3>',
      'after_title' => '</h3>',
    )
  );
}

function c_create_navigation($location)
{
  wp_nav_menu(
    array(
      'theme_location' => $location,
      'menu' => '',
      'container' => 'div',
      'container_class' => 'menu-{menu slug}-container',
      'container_id' => '',
      'menu_class' => 'menu',
      'menu_id' => '',
      'echo' => true,
      'fallback_cb' => 'wp_page_menu',
      'before' => '',
      'after' => '',
      'link_before' => '',
      'link_after' => '',
      'items_wrap' => '<ul>%3$s</ul>',
      'depth' => 0,
      'walker' => ''
    )
  );
}

function c_custom_header($backgrounds)
{
  return '';
}

function c_is_type($type)
{
  global $post;
  // get post by post id
  $post = & get_post($post->ID);
  
  $terms = get_the_terms($post->ID, 'type');
  if(is_array($terms)) {
    foreach ($terms as $term) {
      if ($term->slug == $type) {
        return true;
      }
    }
  }
  return false;
}

function c_get_type()
{
  global $post;
  // get post by post id
  $post = & get_post($post->ID);
  $terms = get_the_terms($post->ID, 'type');
  if ($terms) {
    foreach ($terms as $term) {
      $ret = $term->slug;
      if($ret === 'galerierechts') $ret = 'Galerie';
      return $ret;
    }
  } else {
    return 'Beitrag';
  }

}

function c_print_random_color()
{
  $colors = array('a94f5c', 'd08b95', '7accb8', '8fa39e');
  $index = intval(floor(rand(0, count($colors) - 0.1)));
  echo $colors[$index];
}

//Verarbeitung des Excerpts
//Zunächst Standard entfernen
remove_filter('get_the_excerpt', 'wp_trim_excerpt');
//Anschließend selbst implementieren
add_filter('get_the_excerpt', 'c_excerpt');
function c_excerpt($manualExcerpt)
{
  $excerpt = '';
  $rawContent = get_the_content('');
  $matches = array();
  $hasMatch = preg_match('/^<h2[^>]*>(.+)<\/h2>/', $rawContent, $matches) === 1;
  if ($hasMatch) {
    $excerpt .= '<h2>' . strip_tags($matches[1]) . '</h2>';
  }
  if ($manualExcerpt !== '') {
    $excerpt .= '<div>' . $manualExcerpt . '</div>';
  } else {
    $rawContent = preg_replace('/^<h2.+<\/h2>/', '', $rawContent);
    $rawContent = strip_shortcodes($rawContent);
    $rawContent = apply_filters('the_content', $rawContent);
    $rawContent = str_replace(']]>', ']]&gt;', $rawContent);
    $rawContent = strip_tags($rawContent, '<p>');
    $wordCount = 15;
    $tokens = array();
    $output = '';
    $i = 0;
    //tokenize
    preg_match_all('/(<[^>]+>|[^<>\s]+)\s*/u', $rawContent, $tokens);
    foreach ($tokens[0] as $token) {
      if ($i >= $wordCount && preg_match('/[\,\;\?\.\!]\s*$/uS', $token)) {
        // Limit reached, continue until , ; ? . or ! occur at the end
        $output .= trim($token);
        break;
      }
      $i++;
      $output .= $token;
    }
    $excerpt .= '<div>' . $output . '&nbsp;&nbsp;&nbsp;&hellip;</div>';
  }
  return $excerpt;
}

function c_get_splitted_content($rawContent = null)
{
  if ($rawContent === null) {
    $rawContent = get_the_content('');
  }
  $matches = array();
  $regex = '/^\w*<h2[^>]*>(.+)<\/h2>/s';
  $hasMatch = preg_match($regex, $rawContent, $matches) === 1;
  $headline = $hasMatch ? $matches[1] : '';
  $content = preg_replace($regex, '', $rawContent);
  return array(
    'headline' => $headline,
    'content' => $content,
  );
}

function c_has_subhead()
{
  $content = c_get_splitted_content();
  return $content['headline'] !== '';
}

function c_the_subhead()
{
  $content = c_get_splitted_content();
  echo $content['headline'];
}

function c_the_content()
{
  $content = c_get_splitted_content();
  echo $content['content'];
}

function c_content_filter($content)
{
  $content = c_get_splitted_content($content);
  return $content['content'];
}
add_filter('the_content', 'c_content_filter');

function c_flickr_gallery($atts)
{
  return '</div>
  <section class="article-gallery-images">
    <div class="image-gallery" typeof="sx:smartr.FlickrGallery" data-tag="' . $atts['tag'] . '"></div>
    <div style="clear:both"></div>
  </section>
  <div class="row">';
}

add_shortcode('myflickr', 'c_flickr_gallery');
function c_comment($comment, $args, $depth)
{
  echo 'Kommentar';
  //    print_r($comment);
}

function c_render_infinite_scroll()
{
  while (have_posts()) {
    the_post();
    get_template_part('app/article-list');
  }
}

//Unendliches Scrollen
function c_init_infinite_scroll()
{
  add_theme_support(
    'infinite-scroll',
    array(
      'container' => 'infinite-scroll-container',
      'footer_widgets' => false,
      'type' => 'scroll',
      'wrapper' => false,
      'render' => 'c_render_infinite_scroll',
      'behavior' => 'default'
    )
  );
}
add_action('after_setup_theme', 'c_init_infinite_scroll');


function c_infinite_scroll_options_filter( $options ) {
  $options['behavior'] = 'test';
  return $options;
}

add_filter( 'infinite_scroll_js_options', 'c_infinite_scroll_options_filter' );

function c_enqueue_script() {
  wp_deregister_script('jquery');
  wp_register_script('jquery', get_stylesheet_directory_uri() . '/libs/jquery.min.js');
  wp_enqueue_script( 'jquery');
}

add_action( 'wp_enqueue_scripts', 'c_enqueue_script' );

function c_post_type_remote() {
  register_post_type( 'remote',
  array(
    'label'             => 'Andere Blogs',
    'labels' => array(
      'add_new' => 'Neuer Link',
      'add_new_item' => 'Neuer Link',
      'all_items' => 'Links',
      'singular_name' => 'Link'
    ),
    'public'            => true,
    'has_archive'       => true,
    'show_ui'           => true,
    'show_in_admin_bar' => true,
    'show_in_nav_menus' => false,
    'menu_position'     => 21,
    'menu_icon'         => 'dashicons-editor-quote',
    'rewrite'           => array(
      'slug'       => 'andere-blogs'
    ),
    'supports' => array(
      'title',
      'thumbnail',
      'custom-fields'
    )
  )
);
}
add_action('init', 'c_post_type_remote');

function addImageToRss($content) {
  global $post;
  if ( has_post_thumbnail( $post->ID ) ){
    $content = '<div>' . get_the_post_thumbnail( $post->ID, 'large', array( 'style' => 'margin-bottom: 15px;' ) ) . '</div>' . $content;
  }
  return $content;
}
add_filter('the_excerpt_rss', 'addImageToRss');
add_filter('the_content_feed', 'addImageToRss');