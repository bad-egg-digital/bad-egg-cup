<?php

namespace BadEggCup\Features;

class DefaultPostType
{
    public function __construct()
    {
        /*
         * Default Post Type Disable
         */
        if(!current_theme_supports('badeggcup-defaultPost')) {
            add_filter( 'register_post_post_type_args', [ $this, 'disable' ], 0, 2);
            add_action( 'admin_menu', [ $this, 'removeFromMenu' ] );
            add_action( 'admin_bar_menu', [ $this, 'removeFromAdminbar' ], 999 );
        }

        if(!current_theme_supports('badeggcup-postCategory')) {
            add_action( 'init', [ $this, 'unregister_category' ]);
            add_filter( 'register_category_taxonomy_args', [ $this, 'disable' ], 0, 2);
        }

        if(!current_theme_supports('badeggcup-postTag')) {
            add_action( 'init', [ $this, 'unregister_tag' ]);
            add_filter( 'register_post_tag_taxonomy_args', [ $this, 'disable' ], 0, 2);
        }
    }

    function disable($args, $type)
    {
        $args['public'] = false;

        return $args;
    }

    function removeFromMenu()
    {
        remove_menu_page('edit.php');
    }

    function removeFromAdminbar($wp_admin_bar)
    {
        $wp_admin_bar->remove_node( 'new-post' );
    }

    function unregister_category()
    {
        unregister_taxonomy_for_object_type('category', 'post');
    }

    function unregister_tag()
    {
        unregister_taxonomy_for_object_type('post_tag', 'post');
    }
}
