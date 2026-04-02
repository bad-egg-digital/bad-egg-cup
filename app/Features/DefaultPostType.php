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

        /*
         * Default Post Type Customisations
         */
        if(current_theme_supports('badeggcup-postRewrite') && get_option('page_for_posts')) {
            // add_filter( 'registered_post_type', [$this, 'rewrite'], 20, 2 );
            // add_filter( 'pre_post_link', [$this, 'permalink'], 10, 3);
            add_filter( 'post_type_labels_post', [$this, 'labels']);
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

    public function labels($labels)
    {
        $postsPageID = get_option('page_for_posts');
        $postsPage = ($postsPageID) ? get_post($postsPageID) : null;

        if($postsPage) {
            $labels->singular_name = $postsPage->post_title . ' ' . $labels->singular_name;
            $labels->name = $postsPage->post_title . ' ' . $labels->name;
            $labels->menu_name = $postsPage->post_title;
        }

        return $labels;
    }

    public function rewrite($postType, $args)
    {
        if($postType !== 'post') return;

        $postsPageID = get_option('page_for_posts');
        $postsPage = ($postsPageID) ? get_post($postsPageID) : null;

        if($postsPage) {
            $args->rewrite = [
                'slug' => $postsPage->post_name,
                'with_front' => true,
            ];
        }

        return $args;
    }

    public function permalink($permalink, $post, $leavename)
    {
        $postsPageID = get_option('page_for_posts');
        $postsPage = ($postsPageID) ? get_post($postsPageID) : null;

        if (get_post_type($post) == 'post' && $postsPage) {
            return $postsPage->post_name . $permalink;
        } else {
            return $permalink;
        }
    }
}
