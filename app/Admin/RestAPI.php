<?php

namespace BadEggCup\Admin;
use BadEggCup\Tools;
use BadEggCup\Data;

class RestAPI
{
    public $restBase = 'badeggcup/v1';

    public function __construct()
    {
        add_action( 'wp_enqueue_scripts', [$this, 'localize']);
        add_filter( 'wp_prepare_attachment_for_js', [$this, 'image_sizes'], 10, 3 );
        add_action( 'rest_api_init', [$this, 'settings']);
        add_action( 'rest_api_init', [$this, 'postTypes']);
        add_action( 'rest_api_init', [$this, 'topLevelPages']);
        add_action( 'rest_api_init', [$this, 'image']);
        add_action( 'rest_api_init', [$this, 'blockConfig']);
        add_action( 'rest_api_init', [$this, 'postBlockData']);
    }

    public function errorResponse($args = [])
    {
        $defaultArgs = [
            'code' => 400,
            'message' => __('Error', 'badeggcup'),
            'data' => [
                'status' => 400,
            ],
        ];

        $args = wp_parse_args($args, $defaultArgs);

        return new \WP_ERROR( $args['code'], $args['message'], $args['data'] );
    }

    public function localize()
    {
        $siteURL = site_url();
        $homeURL = get_home_url();

        $data = [
            'siteURL' => $siteURL,
            'homeURL' => $homeURL,
            'rest'      => str_replace($homeURL, '', get_rest_url()),
            'restBase' => $this->restBase,
        ];

        $data = apply_filters(
            'badeggcup_restapi_localize',
            $data,
        );

        ?>

<script>
    const badEggCupAPI = <?= json_encode($data) ?>;
</script>

        <?php
    }

    public function image_sizes( $response, $attachment, $meta )
    {
        if ( empty( $response['sizes'] ) || empty( $meta['sizes'] ) ) {
            return $response;
        }

        $ImageData = new Data\Images;
        $response['sizes'] = $ImageData->applicableSizes($attachment->ID);

        return $response;
    }

    public function settings()
    {
        $Settings = new Tools\Settings;

        if(current_theme_supports('badeggcup-colours')) {
            register_rest_route($this->restBase, '/colours', [
                'methods' => 'GET',
                'callback' => fn() => $this->addRestData($Settings->lookup('colours')),
                'permission_callback' => '__return_true',
            ]);
        }

        if(current_theme_supports('badeggcup-company')) {
            $company = $Settings->lookup('company');

            if(!current_theme_supports('badeggcup-companyAddress')) {
                unset($company['address']);
            }

            if(!current_theme_supports('badeggcup-companyAddressMailing')) {
                unset($company['addressMailing']);
            }

            if(!current_theme_supports('badeggcup-companySocials')) {
                unset($company['socials']);
            }

            register_rest_route($this->restBase, '/company', [
                'methods' => 'GET',
                'callback' => fn() => $this->addRestData($company),
                'permission_callback' => '__return_true',
            ]);
        }

        if(current_theme_supports('badeggcup-companyAddress')) {
            $props = [
                'methods' => 'GET',
                'callback' => fn() => $this->addRestData($Settings->lookup('address', 'company')),
                'permission_callback' => '__return_true',
            ];

            register_rest_route($this->restBase, '/company/address', $props);
        }

        if(current_theme_supports('badeggcup-companyAddressMailing')) {
            $props = [
                'methods' => 'GET',
                'callback' => fn() => $this->addRestData($Settings->lookup('addressMailing', 'company')),
                'permission_callback' => '__return_true',
            ];

            register_rest_route($this->restBase, '/company/addressMailing', $props);
        }

        if(current_theme_supports('badeggcup-companySocials')) {
            $props = [
                'methods' => 'GET',
                'callback' => fn() => $this->addRestData($Settings->lookup('socials')),
                'permission_callback' => '__return_true',
            ];

            if(current_theme_supports('badeggcup-company')) {
                register_rest_route($this->restBase, '/company/socials', $props);
            }

            register_rest_route($this->restBase, '/socials', $props);
        }


        if(current_theme_supports('badeggcup-integrations')) {
            $integrations = $Settings->lookup('integrations');

            if(!current_theme_supports('badeggcup-integrationsFathom')) {
                unset($integrations['fathomID']);
            }

            if(!current_theme_supports('badeggcup-integrationsPlausible')) {
                unset($integrations['plausibleID']);
                unset($integrations['plausibleHost']);
            }

            if(!empty($integrations)) {
                register_rest_route($this->restBase, '/integrations', [
                    'methods' => 'GET',
                    'callback' => fn() => $this->addRestData($integrations),
                    'permission_callback' => '__return_true',
                ]);
            }
        }
    }

    public function addRestData($data)
    {
        return rest_ensure_response($data);
    }

    public function postTypes()
    {
        $ArchiveData = new Data\Archives;
        $Settings = new Tools\Settings;

        register_rest_route($this->restBase, '/post-types', [
            'methods' => 'GET',
            'callback' => function() use($ArchiveData, $Settings) {

                $list = [];

                foreach($ArchiveData->postTypes('objects') as $postType => $props) {
                    $taxonomies = get_taxonomies(['object_type' => [ $postType ]], 'objects');
                    $taxList = [];

                    foreach($taxonomies as $tax => $taxProps) {
                        $taxList[] = [ 'value' => $tax, 'label' => $taxProps->label ];
                    }

                    $list[] = [
                        'postType' => $postType,
                        'label' => $props->label,
                        'primaryTaxonomy' => $Settings->lookup($postType, 'primaryTaxonomies'),
                        'taxonomies' => $taxList,
                    ];
                }

                $list = apply_filters(
                    'badeggcup_archive_post_types',
                    $list,
                );

                return rest_ensure_response([
                    'hasArchive' => $list,
                ]);
            },
            'permission_callback' => '__return_true',
        ]);
    }

    public function topLevelPages()
    {
        register_rest_route($this->restBase, '/pages', [
            'methods' => 'GET',
            'callback' => function(){
                $args = [
                    'post_type' => 'page',
                    'posts_per_page' => -1,
                    'orderby' => 'title',
                    'order' => 'ASC',
                    'post_parent' => 0,
                ];

                $pages = get_posts($args);

                $titleIDs = [
                    [
                        'value' => 0,
                        'label' => __('Select a page', 'badeggcup'),
                    ],
                ];

                foreach($pages as $page) {
                    $titleIDs[] = [
                        'value' => (string)$page->ID,
                        'label' => $page->post_title,
                    ];
                }

                return rest_ensure_response([
                    'topLevel' => $titleIDs,
                ]);
            },
            'permission_callback' => function(){
                return current_user_can('manage_options');
            },
        ]);
    }

    public function image()
    {
        register_rest_route($this->restBase, '/image/(?P<id>\d+)', [
            'methods' => 'GET',
            'callback' => function($request){
                $ImageData = new Data\Images;
                $basics = $ImageData->basics($request['id']);

                if($basics) {
                    return rest_ensure_response($basics);

                } else {
                    return $this->errorResponse();
                }

            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($this->restBase, '/image/(?P<id>\d+)/sizes', [
            'methods' => 'GET',
            'callback' => function($request){
                $ImageData = new Data\Images;
                $sizes = $ImageData->applicableSizes($request['id']);

                return rest_ensure_response($sizes);
            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($this->restBase, '/image/(?P<id>\d+)/sizes/(?P<size>[a-zA-Z0-9-]+)', [
            'methods' => 'GET',
            'callback' => function($request){
                $image = wp_get_attachment_image_src($request['id'], $request['size']);

                $ImageData = new Data\Images;
                $sizes = $ImageData->applicableSizes($request['id']);

                if(isset($sizes[$request['size']])) {
                    return rest_ensure_response($sizes[$request['size']]);
                } else {
                    return $this->errorResponse();
                }

            },
            'permission_callback' => '__return_true',
        ]);

        register_rest_route($this->restBase, '/image/(?P<id>\d+)/srcset/(?P<size>[a-zA-Z0-9-]+)', [
            'methods' => 'GET',
            'callback' => function($request){
                $ImageSrcset = new Tools\ImageSrcset;
                $srcset = $ImageSrcset->srcset(['image' => $request['id'], 'name' => $request['size'], 'sizes' => $request['sizes']]);

                return rest_ensure_response($srcset);
            },
            'args' => [
                'id' => [
                    'required' => true,
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    },
                ],
                'size' => [
                    'default' => 'hero',
                ],
                'sizes' => [
                    'required' => false,
                    'default' => 5,
                    'validate_callback' => function($param) {
                        return is_numeric($param);
                    },
                ],
            ],
            'permission_callback' => '__return_true',
        ]);
    }


        public function blockConfig( )
    {
        register_rest_route($this->restBase, '/blocks/config', [
            'methods' => 'GET',
            'callback' => [ $this, 'config'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function config()
    {
        return rest_ensure_response([
            'container' => $this->containerWidths(),
            'colours' => $this->colours(),
            'tints' => $this->tints(),
        ]);
    }

    public function containerWidths()
    {
        return [
            [ 'label' => __('Auto', 'badegg'),          'value' => 0        ],
            [ 'label' => __('Narrow', 'badegg'),        'value' => 'narrow' ],
            [ 'label' => __('Small', 'badegg'),         'value' => 'small'  ],
            [ 'label' => __('Medium', 'badegg'),        'value' => 'medium' ],
            [ 'label' => __('Large', 'badegg'),         'value' => 'large'  ],
            [ 'label' => __('Edge to edge', 'badegg'),  'value' => 'full'   ],
        ];
    }

    public function colours()
    {
        $palette = [];

        if(class_exists('\BadEggCup\Tools\Colour')) {
            $Colour = new Tools\Colour;
            $colours = $Colour->values();

            foreach($colours as $slug => $hex) {
                if($hex && class_exists('\ourcodeworld\NameThatColor\ColorInterpreter')) {
                    $NameThatColour = new \ourcodeworld\NameThatColor\ColorInterpreter;
                    $name = @$NameThatColour->name($hex)['name'];
                } else {
                    $name = ucfirst($slug);
                }

                $palette[] = [
                    'name' => esc_html__($name, 'badeggcup'),
                    'slug' => $slug,
                    'color' => $hex,
                ];
            }
        }

        return $palette;
    }

    public function tints()
    {
        return [
            ['label' => __('Lightest',  'badegg'), 'value' => 'lightest'],
            ['label' => __('Lighter',   'badegg'), 'value' => 'lighter' ],
            ['label' => __('Light',     'badegg'), 'value' => 'light'   ],
            ['label' => __('None',      'badegg'), 'value' => 0         ],
            ['label' => __('Dark',      'badegg'), 'value' => 'dark'    ],
            ['label' => __('Darker',    'badegg'), 'value' => 'darker'  ],
            ['label' => __('Darkest',   'badegg'), 'value' => 'darkest' ],
        ];
    }

    public function postBlockData()
    {
        $postTypes = [];

        $postTypes = apply_filters(
            'badeggcup_restapi_blocks',
            $postTypes,
        );

        if( empty($postTypes)) return;

        foreach($postTypes as $postType) {
            register_rest_route('wp/v2', "/{$postType}/(?P<id>\d+)/blocks", [
                'methods'  => 'GET',
                'callback' => [$this, 'getPostBlockData'],
                'permission_callback' => '__return_true',
            ]);

            register_rest_route('wp/v2', "/{$postType}/(?P<id>\d+)/blocks/(?P<index>\d+)", [
                'methods'  => 'GET',
                'callback' => [$this, 'getPostBlockData'],
                'permission_callback' => '__return_true',
            ]);

            register_rest_route('wp/v2',  "/{$postType}/(?P<id>\d+)/blocks/(?P<index>\d+)/(?P<key>[\w-]+)", [
                'methods'  => 'GET',
                'callback' => [$this, 'getPostBlockData'],
                'permission_callback' => '__return_true',
            ]);
        }
    }

    public function getPostBlockData($request)
    {
        $postID = $request['id'];
        $post = get_post($postID);

        $data = [];

        if($post && $post->post_content) {
            $Blocks = new Data\Blocks;
            $content = $post->post_content;
            $data = $Blocks->blocksMap(parse_blocks($content), $postID);
        }

        if(isset($request['index'])) {
            $index = $request['index'];

            if($index < count($data)) {
                $data = $data[$index];

                if(isset($request['key'])) {
                    $key = $request['key'];

                    if(isset($data[$key])) {
                        $data = $data[$key];
                    }
                }

            } else {
                $data = [];
            }
        }

        return rest_ensure_response($data);
    }
}
