<?php

namespace BadEggCup\Admin;

class RestAPI
{
    public $restBase = 'badeggcup/v1';

    public function __construct()
    {
        add_action( 'rest_api_init', [$this, 'postTypes']);
    }

    public function postTypes()
    {
        register_rest_route($this->restBase, '/post-types', [
            'methods' => 'GET',
            'callback' => function(){
                $args = [
                    'has_archive' => true,
                ];

                $postTypes = get_post_types($args, 'names');

                return rest_ensure_response([
                    'archives' => $postTypes,
                ]);
            },
            'permission_callback' => function(){
                return current_user_can('manage_options');
            },
        ]);
    }
}
