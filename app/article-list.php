<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <a class="article-item" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>"
       style="border-top-color: #<?php c_print_random_color(); ?>">

        <?php if (has_post_thumbnail()) : ?>
            <div class="image">
                <?php the_post_thumbnail('medium'); ?>
            </div>
        <?php endif; ?>


        <div class="text">
            <h4 class="super"><?php echo ucfirst(c_get_type()) ?> vom <?php the_date() ?></h4>

            <h1 class="hyphenate">
                <?php the_title(); ?>
            </h1>

            <div class="excerpt">
                <?php the_excerpt() ?>
            </div>

            <div class="more">mehr</div>
        </div>
    </a>
</article>
