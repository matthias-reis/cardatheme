<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <?php if (has_post_thumbnail()) : ?>
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
            <?php the_post_thumbnail(array(700, 100)); ?>
        </a>
    <?php endif; ?>

    <h2>
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
            <?php the_title(); ?>
        </a>
    </h2>

    <div class="article-content">
        <?php the_content(); ?>
    </div>

</article>