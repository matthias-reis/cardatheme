<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <a class="article-item" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">

        <?php if (has_post_thumbnail()) : ?>
            <div class="image">
                <?php the_post_thumbnail('medium'); ?>
            </div>
        <?php endif; ?>


        <div class="text">
            <h2><em>Anne am 21. Juli 2015</em></h2>

            <h1>
                <?php the_title(); ?>
            </h1>

            <div class="excerpt">
                <h2>Headline and so on</h2>

                <p><?php the_excerpt() ?></p>
            </div>
            <p class="more">mehr ...</p>
        </div>
    </a>
</article>
