<header class="ribbon ribbon-dark headline">
    <div class="row inner-headline">
        <?php if (has_post_thumbnail()) : ?>
            <?php the_post_thumbnail('title'); ?>
        <?php endif; ?>
        <hgroup>
            <h3 class="meta"><?php echo ucfirst(c_get_type()) ?> vom <?php the_date() ?></h3>

            <h1>
                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                    <?php the_title(); ?>
                </a>
            </h1>

            <h2>
                <?php c_the_subhead(); ?>
            </h2>
        </hgroup>
    </div>
</header>