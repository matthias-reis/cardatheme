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
    add_image_size('large', 800, '', true);
    add_image_size('medium', 640, '', true);
    add_image_size('small', 320, '', true);
    add_image_size('title', 800, 250, true);
}
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
            'name' => 'Top-Widgets',
            'id' => 'top_widgets',
            'before_widget' => '<section>',
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>',
        )
    );
    register_sidebar(
        array(
            'name' => 'Widgets für Übersichtsseiten',
            'id' => 'list_widgets',
            'before_widget' => '<section>',
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>',
        )
    );
    register_sidebar(
        array(
            'name' => 'Widgets für Posts',
            'id' => 'post_widgets',
            'before_widget' => '<section>',
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>',
        )
    );
    register_sidebar(
        array(
            'name' => 'Widgets für Seiten',
            'id' => 'page_widgets',
            'before_widget' => '<section>',
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>',
        )
    );
    register_sidebar(
        array(
            'name' => 'Social-Widgets',
            'id' => 'social_widgets',
            'before_widget' => '<section>',
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>',
        )
    );
    register_sidebar(
        array(
            'name' => 'Link-Widgets',
            'id' => 'link_widgets',
            'before_widget' => '<section>',
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>',
        )
    );

    register_sidebar(
        array(
            'name' => 'Widgets im Footer',
            'id' => 'footer_widgets',
            'before_widget' => '<section class="small-6 medium-4 columns">',
            'after_widget' => '</section>',
            'before_title' => '<h2>',
            'after_title' => '</h2>',
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
    foreach (get_the_terms($post->ID, 'type') as $term) {
        if ($term->slug == $type) {
            return true;
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
        $term = $terms[0];
        return $term->slug;
    } else {
        return 'Beitrag';
    }

}

function c_print_random_color()
{
    $colors = array('cc8888', '88ccaa', 'cccc88', 'aacc88', 'cc88cc', '88aacc', '88cc88', 'cc88aa');
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
        $excerpt .= '<h2>' . $matches[1] . '</h2>';
    }
    if ($manualExcerpt !== '') {
        $excerpt .= '<div>' . $manualExcerpt . '</div>';
    } else {
        $rawContent = preg_replace('/^<h2.+<\/h2>/', '', $rawContent);
        $rawContent = strip_shortcodes($rawContent);
        $rawContent = apply_filters('the_content', $rawContent);
        $rawContent = str_replace(']]>', ']]&gt;', $rawContent);
        $rawContent = strip_tags($rawContent, array('<p>'));
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
        $excerpt .= '<div>' . $output . '&nbsp;&nbsp;&nbsp;&nbsp;[&hellip;]</div>';
    }
    return $excerpt;
}

function c_get_splitted_content($rawContent = null)
{
    if($rawContent === null) {
        $rawContent = get_the_content('');
    }
    $matches = array();
    $hasMatch = preg_match('/^<h2[^>]*>(.+)<\/h2>/', $rawContent, $matches) === 1;
    $headline = $hasMatch ? '<h2>' . $matches[1] . '</h2>' : '';
    $content = preg_replace('/^<h2.+<\/h2>/', '', $rawContent);

    return array(
        'headline' => $headline,
        'content' => $content,
    );
}

function c_the_subhead(){
    $content = c_get_splitted_content();
    echo $content['headline'];
}

add_filter('the_content', 'c_content_filter');
function c_content_filter($content) {
    $content = c_get_splitted_content($content);
    return $content['content'];
}
