<?php

namespace BadEggCup\Features;

class Comments
{
    public function __construct()
    {
        if(!current_theme_supports('badeggcup-comments')) {
            add_action('admin_init', [$this, 'commentstatusdiv']);                      // Disable comment status div meta box
            add_action('wp_dashboard_setup', [$this, 'dashboard_activity']);            // Remove the Activity widget
            add_action('wp_before_admin_bar_render', [$this, 'remove_menu_item']);      // Remove from admin bar
            add_action('admin_menu', [$this, 'admin_menu']);                            // Remove from backend menu
            add_action('wp_dashboard_setup', [$this, 'dashboard_recent_comments']);     // Remove Dashboard Meta Box
            add_filter('comments_rewrite_rules', '__return_empty_array');               // Remove comment rewrite rule
            add_action('after_theme_setup', [$this, 'theme_support']);                  // Remove comment theme support
            add_filter('rewrite_rules_array', [$this, 'rewrite']);                      // Clean up rewrite rule
        }
    }

    public function commentstatusdiv()
    {
        remove_meta_box( 'commentstatusdiv', 'post', 'normal' );
        remove_post_type_support( 'post', 'comments' );

        remove_meta_box( 'commentstatusdiv', 'page', 'normal' );
        remove_post_type_support( 'page', 'comments' );
    }

    public function dashboard_activity()
    {
        remove_meta_box( 'dashboard_activity', 'dashboard', 'normal' );
    }

    public function remove_menu_item()
    {
        global $wp_admin_bar;
        $wp_admin_bar->remove_menu('comments');
    }

    public function admin_menu()
    {
        remove_menu_page( 'edit-comments.php' );
        remove_submenu_page( 'options-general.php', 'options-discussion.php' );
    }

    public function dashboard_recent_comments()
    {
        remove_meta_box( 'dashboard_recent_comments', 'dashboard', 'normal' );
    }

    public function theme_support()
    {
        remove_theme_support('comments');
    }

    public function rewrite($rules)
    {
        foreach ($rules as $rule => $rewrite) {
          if (preg_match('/.*(feed)/', $rule)) {
            unset($rules[$rule]);
          }
          if (preg_match('/.*(comment-page)/', $rule)) {
            unset($rules[$rule]);
          }
        }
        return $rules;
    }
}
