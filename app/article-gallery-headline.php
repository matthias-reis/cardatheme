<header class="ribbon ribbon-main headline gallery-headline">
    <div class="row inner-headline">
        <hgroup>
            <h4 class="super"><?php echo ucfirst(c_get_type()) ?> vom <?php the_date() ?></h4>
            <h1>
                <a href="<?php the_permalink(); ?>" title="<?php the_title(); ?>">
                    <?php the_title(); ?>
                </a>
            </h1>
        </hgroup>
    </div>
</header>