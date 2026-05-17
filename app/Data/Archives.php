<?php

namespace BadEggCup\Data;
use BadEggCup\Tools;

class Archives
{
    public function __construct()
    {

    }

    public function pagesForArchives()
    {
        $Settings = new Tools\Settings;

        $pagesForArchives = [];
        $app_context = \WPGraphQL::get_app_context();

        $pageForPosts = get_option('page_for_posts');

        if($pageForPosts) {
            $pagesForArchives[] = [
                'postType' => 'post',
                'page' => $app_context->get_loader('post')->load_deferred($pageForPosts),
            ];
        }

        $postTypes = get_post_types([
            'has_archive' => true,
        ], 'names');

        foreach($postTypes as $postType) {
            $archivePage = $Settings->lookup($postType, 'pagesForArchives');

            if($archivePage) {
                $pagesForArchives[] = [
                    'postType' => $postType,
                    'page' => $app_context->get_loader('post')->load_deferred($archivePage),
                ];
            }
        }

        return $pagesForArchives;
    }
}
