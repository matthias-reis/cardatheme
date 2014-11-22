<aside class="logo">
    <img src="<?php echo get_template_directory_uri(); ?>/img/logo.jpg">
</aside>

<article id="post-<?php the_ID(); ?>" <?php post_class('c-single-article'); ?>>

    <header>

        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('title'); ?>
        <?php endif; ?>

        <hgroup>

            <h1>
                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                    <?php the_title(); ?>
                </a>
            </h1>

            <h2>
                <?php c_the_subhead(); ?>
            </h2>
        </hgroup>

    </header>

    <div class="article-content">
        <p class="meta"><?php echo ucfirst(c_get_type()) ?> vom <?php the_date() ?></p>

        <?php the_content(); ?>
    </div>

</article>