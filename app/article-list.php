<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <a class="article-item" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"
       style="border-top-color: #<?php c_print_random_color(); ?>">

        <?php if (has_post_thumbnail()) : ?>
            <div class="image">
                <?php the_post_thumbnail('medium'); ?>
            </div>
        <?php endif; ?>


        <div class="text">
            <h2><em><?php the_author();?> am <?php the_date('d.m.Y'); ?></em></h2>

            <h1>
                <?php the_title(); ?>
            </h1>

            <div class="excerpt">
                <?php the_excerpt() ?>
            </div>

            <p class="more">mehr ...</p>
        </div>
    </a>
</article>
