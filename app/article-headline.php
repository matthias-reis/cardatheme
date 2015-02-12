<header class="ribbon ribbon-main headline<?php if (has_post_thumbnail()) : ?> with-thumbnail<?php endif; ?>">
    <div class="row inner-headline">
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('title'); ?>
        <?php endif; ?>
        <hgroup>
            <h4 class="super">
                <?php
                    if(!is_page()){
                        echo ucfirst(c_get_type()) . 'vom' . the_date();
                    }
                ?>
            </h4>

            <h1>
                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                    <?php the_title(); ?>
                </a>
            </h1>

            <h3>
                <?php c_the_subhead(); ?>
            </h3>
        </hgroup>
        <div style="clear:both"></div>
    </div>
</header>