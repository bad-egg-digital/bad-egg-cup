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

        wp_enqueue_style(
            'badeggcup-style',
            plugins_url( 'build/index.css', BADEGGCUP_FILE ),
            array_filter(
                $asset['dependencies'],
                function ( $style ) {
                    return wp_style_is( $style, 'registered' );
                }
            ),
            $asset['version'],
        );

    }

    public function options_schema()
    {
        $addressDefaults = [
            'line1' => '',
            'line2' => '',
            'line3' => '',
            'line4' => '',
            'city' => '',
            'county' => '',
            'postCode' => '',
            'country' => '',
        ];

        $default = [
            'colours' => [
                'primary' => '#395786',
                'secondary' => '#a094b1',
                'tertiary' => '',
                'quaternary' => '',
                'quinary' => '',
                'senary' => '',
                'septenary' => '',
                'octonary' => '',
                'nonary' => '',
                'denary' => '',
                'undenary' => '',
                'duodenary' => '',
            ],
            'company' => [
                'name' => '',
                'nameLegal' => '',
                'number' => '',
                'tel' => '',
                'email' => '',
                'address' => $addressDefaults,
                'addressMailing' => $addressDefaults,
            ],
            'supports' => [
                'defaultPost' => false,
                'postRewrite' => false,
                'postCategory' => false,
                'postTag' => false,
                'comments' => false,
                'mailingAddress' => false,
            ],
        ];

        $addressSchema = [
            'type' => 'object',
            'properties' => [
                'line1' => [ 'type' => 'string' ],
                'line2' => [ 'type' => 'string' ],
                'line3' => [ 'type' => 'string' ],
                'line4' => [ 'type' => 'string' ],
                'city' => [ 'type' => 'string' ],
                'county' => [ 'type' => 'string' ],
                'postCode' => [ 'type' => 'string' ],
                'country' => [ 'type' => 'string' ],
            ],
        ];

        $schema  = [
            'type'       => 'object',
            'properties' => [
                // Colours
                'colours' => [
                    'type' => 'object',
                    'properties' => [
                        'primary' => [ 'type' => 'string' ],
                        'secondary' => [ 'type' => 'string' ],
                        'tertiary' => [ 'type' => 'string' ],
                        'quaternary' => [ 'type' => 'string' ],
                        'quinary' => [ 'type' => 'string' ],
                        'senary' => [ 'type' => 'string' ],
                        'septenary' => [ 'type' => 'string' ],
                        'octonary' => [ 'type' => 'string' ],
                        'nonary' => [ 'type' => 'string' ],
                        'denary' => [ 'type' => 'string' ],
                        'undenary' => [ 'type' => 'string' ],
                        'duodenary' => [ 'type' => 'string' ],
                    ],
                ],

                // Company Info
                'company' => [
                    'type' => 'object',
                    'properties' => [
                        'name' => [ 'type' => 'string' ],
                        'nameLegal' => [ 'type' => 'string' ],
                        'number' => [ 'type' => 'string' ],
                        'tel' => [ 'type' => 'string' ],
                        'email' => [ 'type' => 'string' ],
                        'address' => $addressSchema,
                        'addressMailing' => $addressSchema,
                    ],
                ],

                // Theme Supports
                'supports' => [
                    'type' => 'object',
                    'properties' => [
                        'defaultPost' => [ 'type' => 'boolean' ],
                        'postRewrite' => [ 'type' => 'boolean' ],
                        'postCategory' => [ 'type' => 'boolean' ],
                        'postTag' => [ 'type' => 'boolean' ],
                        'comments' => [ 'type' => 'boolean' ],
                        'mailingAddress' => [ 'type' => 'boolean' ],
                    ]
                ]
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
