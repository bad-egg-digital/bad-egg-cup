<?php

namespace BadEggCup\Admin;

class Menus
{
    public function __construct()
    {
        add_action( 'admin_init', [$this, 'editor_theme_options']);
        add_action( 'admin_menu', [$this, 'top_level_navigation_menus']);
    }

    public function editor_theme_options()
    {
        $editorObject = get_role('editor');

        if(!$editorObject->has_cap('edit_theme_options')) {
            $editorObject->add_cap('edit_theme_options');
        }
    }

    public function top_level_navigation_menus()
    {
        if(!current_user_can('administrator')) {
            add_menu_page(
                __('Menus', 'badegg'),
                __('Navigation', 'badegg'),
                'edit_theme_options',
                'nav-menus.php',
                null,
                'dashicons-menu',
                60,
            );

            remove_menu_page('themes.php');
        }
    }
}
