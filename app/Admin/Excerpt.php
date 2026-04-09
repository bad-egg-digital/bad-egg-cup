<?php

namespace BadEggCup\Admin;

class Excerpt
{
    public function __construct()
    {
        add_action( 'admin_menu', [ $this, 'remove' ], 999);
        add_action( 'edit_form_after_title', [ $this, 're_add' ], 90);
    }

    public function remove()
    {
        $postTypes = get_post_types([], 'names');

        foreach($postTypes as $postType):
            if(post_type_supports($postType, 'excerpt') && post_type_supports($postType, 'excerpt-below-title')):
                remove_meta_box('postexcerpt', $postType, 'normal');
            endif;
        endforeach;
    }

    public function re_add()
    {
        global $post;

        if($post):
            $postType = @$post->post_type;
            $object = get_post_type_object($postType);

            if(post_type_supports($postType, 'excerpt') && post_type_supports($postType, 'excerpt-below-title')): ?>

                <div id="postexcerpt" class="postbox">
                    <div class="postbox-header">
                        <h2 class="hndle ui-sortable-handle">Excerpt</h2>
                    </div>

                    <div class="inside">
                        <label class="screen-reader-text" for="excerpt">Excerpt</label>
                        <?= post_excerpt_meta_box($post); ?>
                    </div>
                </div>

            <?php endif;
        endif;
    }
}
