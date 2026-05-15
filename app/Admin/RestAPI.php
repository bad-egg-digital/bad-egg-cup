<?php

namespace BadEggCup\Admin;
use BadEggCup\Tools;

class RestAPI
{
    public $restBase = 'badeggcup/v1';

    public function __construct()
    {
        add_action( 'rest_api_init', [$this, 'settings']);
        add_action( 'rest_api_init', [$this, 'postTypes']);
        add_action( 'rest_api_init', [$this, 'topLevelPages']);
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
        register_rest_route($this->restBase, '/post-types', [
            'methods' => 'GET',
            'callback' => function(){
                $args = [
                    'has_archive' => true,
                ];

                $defaultPost = get_post_type_object('post');
                $postTypes = get_post_types($args, 'objects');

                $list = [];

                foreach($postTypes as $postType => $props) {
                    $list[$postType] = $props->label;
                }

                return rest_ensure_response([
                    'hasArchive' => $list,
                ]);
            },
            'permission_callback' => function(){
                return current_user_can('manage_options');
            },
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
                    'fields' => [ 'title', 'ids' ],
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
}
