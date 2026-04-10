<?php

namespace BadEggCup\Admin;

class Enqueue
{
    public function __construct()
    {
        add_action( 'admin_enqueue_scripts',  [$this, 'addStylesScripts']);
    }

    public function addStylesScripts()
    {

        $asset_file = BADEGGCUP_DIR . '/build/index.asset.php';

        if ( ! file_exists( $asset_file ) ) {
            return;
        }

        $asset = include $asset_file;

        wp_enqueue_style(
            'badeggcup-admin',
            BADEGGCUP_URL . 'src/css/admin.css',
            [],
            BADEGGCUP_VER,
        );
    }
}
