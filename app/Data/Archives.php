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
        $pageForPosts = get_option('page_for_posts');

        if($pageForPosts) {
            $pagesForArchives['post'] = $pageForPosts;
        }

        foreach($this->postTypes() as $postType) {
            $pagesForArchives[$postType] = $Settings->lookup($postType, 'pagesForArchives');
        }

        $pagesForArchives = apply_filters(
            'badeggcup_pages_for_archives',
            $pagesForArchives,
        );

        return $pagesForArchives;
    }

    public function primaryTaxonomies()
    {
        $Settings = new Tools\Settings;

        $primaryTaxonomies = [
            'post' => 'category',
        ];

        foreach($this->postTypes() as $postType) {
            $primaryTaxonomies[$postType] = $Settings->lookup($postType, 'primaryTaxonomies');
        }

        $primaryTaxonomies = apply_filters(
            'badeggcup_pages_for_archives',
            $primaryTaxonomies,
        );

        return $primaryTaxonomies;
    }

    public function postTypes($output = 'names')
    {
        $args = apply_filters(
            'badeggcup_pages_for_archives_args',
            [
                'has_archive' => true,
            ],
        );

        $postTypes = get_post_types($args, $output) ?: [];

        if($output == 'names') {
            $postTypes = array_keys($postTypes);
        }

        $postTypes = apply_filters(
            'badeggcup_archive_post_types',
            $postTypes,
        );

        return $postTypes;

    }
}
