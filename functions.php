<?php

if (!isset($content_width)) {
    $content_width = 900;
}

if (function_exists('add_theme_support')) {
    // Add Menu Support
    add_theme_support('menus');
    // Add Thumbnail Theme Support
    add_theme_support('post-thumbnails');
    add_theme_support('post-formats', array('image', 'gallery', 'quote', 'link', 'video', 'own'));
    // Add Support for Custom Backgrounds - Uncomment below if you're going to use
    add_theme_support(
        'custom-background',
        array(
            'default-color' => 'FFF',
            'default-image' => get_template_directory_uri() . '/img/bg.jpg'
        )
    );
    // Enables post and comment RSS feed links to head
    add_theme_support('automatic-feed-links');

    add_image_size('large', 700, '', true);
    add_image_size('medium', 250, '', true);
    add_image_size('small', 120, '', true);
    add_image_size('custom-size',700,200,true);
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

function c_is_type($type) {
    global $post;
    // get post by post id
    $post = & get_post($post->ID);

    foreach(get_the_terms($post->ID, 'type') as $term){
        if($term->slug == $type) {
            return true;
        }
    }
    return false;
//
//
//    // get post type by post
//    $post_type = $post->post_type;
//    // get post type taxonomies
//    $taxonomies = get_object_taxonomies($post_type);
//    $out = "<ul>";
//    foreach ($taxonomies as $taxonomy) {
//        $out .= "<li>" . $taxonomy . ": ";
//        // get the terms related to post
//        $terms = get_the_terms($post->ID, $taxonomy);
//        if (!empty($terms)) {
//            foreach ($terms as $term) $out .= '<a href="' . get_term_link(
//                    $term->slug,
//                    $taxonomy
//                ) . '">' . $term->name . '</a> ';
//        }
//        $out .= "</li>";
//    }
//    $out .= "</ul>";
//    return $out;
//    var_dump(get_the_terms('type'));
//    return is_tax('type', $type);
}