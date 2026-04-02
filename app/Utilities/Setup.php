<?php

namespace BadEggCup\Utilities;

if (!defined('ABSPATH')) {
    exit; // Exit if accessed directly.
}

class Setup
{
    public function __construct()
    {
        add_action('after_setup_theme', [ $this, 'assignDefaults']);
        add_action('update_option_badeggcup', [$this, 'updateSettings']);
    }

    public function assignDefaults()
    {
        /*
         * * * * * * * * * * *
         * SET PAGE DEFAULTS *
         * * * * * * * * * * *
         */
        update_option('show_on_front', 'page');

        $defaultPostID = 1;
        $defaultPost = get_post($defaultPostID);

        if($defaultPost->post_name == 'hello-world' && !get_post_meta($defaultPostID, '_badeggcup_defaults_set', true)) {
            $defaultPost->post_type = 'page';
            $defaultPost->post_name = 'home';
            $defaultPost->post_title = 'Home';
            $defaultPost->menu_order = -100;
            $defaultPost->post_content = '';

            wp_update_post($defaultPost);
            update_post_meta($defaultPostID, '_badeggcup_defaults_set', true);
            update_option('page_on_front', $defaultPostID);
        }

        $defaultPageID = 2;
        $defaultPage = get_post($defaultPageID);

        if($defaultPage->post_name == 'sample-page' && !get_post_meta($defaultPageID, '_badeggcup_defaults_set', true)) {
            $defaultPage->post_title = 'Blog';
            $defaultPage->post_name = 'blog';
            $defaultPage->menu_order = -99;
            $defaultPage->post_content = '';

            wp_update_post($defaultPage);
            update_post_meta($defaultPostID, '_badeggcup_defaults_set', true);
            update_option('page_for_posts', $defaultPageID);
        }

        $defaultPrivacyID = 3;
        $defaultPrivacy = get_post($defaultPrivacyID);

        if($defaultPrivacy->post_name == 'privacy-policy'  && !get_post_meta($defaultPrivacyID, '_badeggcup_defaults_set', true)) {
            $defaultPrivacy->post_content = '';
            $defaultPrivacy->post_status = 'publish';
            $defaultPrivacy->menu_order = 500;

            wp_update_post($defaultPrivacy);
            update_post_meta($defaultPrivacyID, '_badeggcup_defaults_set', true);
            update_option('page_for_privacy_policy', $defaultPrivacyID);
        }

        /*
         * * * * * * * * * * * * * *
         * SET MEDIA DEFAULT SIZES *
         * * * * * * * * * * * * * *
         */
        if(get_option('thumbnail_size_w') == 150) {
            update_option('thumbnail_size_w', 300);
            update_option('thumbnail_size_h', 300);
        }

        if(get_option('medium_size_w') == 300) {
            update_option('medium_size_w', 1000);
            update_option('medium_size_h', 1000);
        }

        if(get_option('large_size_w') == 1024) {
            update_option('large_size_w', 1600);
            update_option('large_size_h', 1600);
        }

        /*
         * * * * * * * * * * * * * *
         * SET PERMALINK STRUCTURE *
         * * * * * * * * * * * * * *
         */
        if(!get_option('permalink_structure')) {
            update_option('permalink_structure', '/%postname%/');

            global $wp_rewrite;
            $wp_rewrite->flush_rules();
        }
    }

    public function updateSettings($prev, $new, $option)
    {
        global $wp_rewrite;
        $wp_rewrite->flush_rules();
    }
}
