<!-- article -->
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>

    <!-- post thumbnail -->
    <?php if (has_post_thumbnail()) : // Check if thumbnail exists ?>
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
            <?php the_post_thumbnail(array(120, 120)); // Declare pixel size you need inside the array ?>
        </a>
    <?php endif; ?>
    <!-- /post thumbnail -->

    <!-- post title -->
    <h2>
        <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
            <?php the_title(); ?>
        </a>
    </h2>
    <!-- /post title -->

</article>
<!-- /article -->