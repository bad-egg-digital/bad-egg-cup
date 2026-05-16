<?php

namespace BadEggCup\Data;

class Images
{
    public function __construct()
    {

    }

    public function basics($imageID)
    {
        if(!$imageID) return [];

        $image = wp_get_attachment_image_src($imageID, 'full');

        if(!$image) return [];

        $src = $image[0];
        $width = $image[1];
        $height = $image[2];
        $cropped = $image[3];

        $title = get_post_field( 'post_title', $imageID );
        $caption = get_post_field( 'post_excerpt', $imageID );
        $description = get_post_field( 'post_content', $imageID );
        $alt = get_post_meta( $imageID, '_wp_attachment_image_alt', true );

        $imageData = [
            'id' => $imageID,
            'title' => $title,
            'caption' => $caption,
            'description' => $description,
            'alt' => $alt,
        ];

        $imageData['sizes'] = $this->applicableSizes($imageID);

        return $imageData;
    }

    public function applicableSizes($imageID = 0, $size = '')
    {
        if(!$imageID) return [];
        global $_wp_additional_image_sizes;

        $image = wp_get_attachment_image_src($imageID, 'full');

        $sizes = [
            'full' => [
                'width' => $image[1],
                'height' => $image[2],
                'crop' => $image[3],
                'url' => $image[0],
                'orientation' => $this->orientation($image[1], $image[2]),
            ],
        ];

        foreach($_wp_additional_image_sizes as $slug => $props) {
            if($image[1] >= $props['width'] && $image[2] >= $props['height']) {
                $size = @wp_get_attachment_image_src($imageID, $slug);

                if(!$size) continue;

                $sizes[$slug] = [
                    'width' => $size[1],
                    'height' => $size[2],
                    'crop' => $size[3],
                    'url' => $size[0],
                    'orientation' => $this->orientation($size[1], $size[2]),
                ];
            } else {
                $sizes[$slug] = [];
            }
        }

        return $sizes;

    }

    public function orientation($width = 0, $height = 0)
    {
        $orientation = ($height > $width) ? 'portrait' : 'landscape';

        return $orientation;
    }
}
