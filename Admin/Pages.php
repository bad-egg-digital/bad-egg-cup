<?php

namespace BadEggCup\Admin;

class Pages
{
    public function __construct()
    {
        add_action( 'admin_menu', [$this, 'options']);
        add_action( 'admin_enqueue_scripts', [$this, 'options_script'] );
        add_action( 'init', [$this, 'options_schema'] );
    }

    public function options()
    {
        add_menu_page(
            __( 'Site Options', 'badeggcup' ),
            __( 'Site Options', 'badeggcup' ),
            'manage_options',
            'badeggcup-options',
            [$this, 'options_html'],
            '',
            50,
        );
    }

    public function options_html()
    {
        printf(
            '<div class="wrap" id="badeggcup-options">%s</div>',
            esc_html__( 'Loading…', 'badeggcup' )
        );
    }

    public function options_script($admin_page)
    {
        if ( 'toplevel_page_badeggcup-options' !== $admin_page ) {
            return;
        }

        $asset_file = BADEGGCUP_DIR . '/build/index.asset.php';

        if ( ! file_exists( $asset_file ) ) {
            return;
        }

        $asset = include $asset_file;

        wp_enqueue_script(
            'badeggcup-script',
            plugins_url( 'build/index.js', BADEGGCUP_FILE ),
            $asset['dependencies'],
            $asset['version'],
            [
                'in_footer' => true,
            ],
        );

    }

    public function options_schema()
    {
        $default = [
            'message' => __( 'Hello, World!', 'badeggcup' ),
            'display' => true,
            'size'    => 'medium',
            'supportDefaultPost' => false,
            'supportPostrewrite' => false,
            'supportPostTag' => false,
            'supportPostCategory' => false,
            'supportComments' => false,
        ];
        $schema  = [
            'type'       => 'object',
            'properties' => [
                'message' => [
                    'type' => 'string',
                ],
                'display' => [
                    'type' => 'boolean',
                ],
                'size'    => [
                    'type' => 'string',
                    'enum' => [
                        'small',
                        'medium',
                        'large',
                        'x-large',
                    ],
                ],
                'supportDefaultPost' => [
                    'type' => 'boolean',
                ],
                'supportPostRewrite' => [
                    'type' => 'boolean',
                ],
                'supportPostTag' => [
                    'type' => 'boolean',
                ],
                'supportPostCategory' => [
                    'type' => 'boolean',
                ],
                'supportComments' => [
                    'type' => 'boolean',
                ],
            ],
        ];

        register_setting(
            'options',
            'badeggcup',
            [
                'type'         => 'object',
                'default'      => $default,
                'show_in_rest' => [
                    'schema' => $schema,
                ],
            ]
        );
    }
}
