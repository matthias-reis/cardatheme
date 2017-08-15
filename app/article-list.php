
<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );?>
<article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <a class="article-item" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" style="background-image: url()">

        <?php if (has_post_thumbnail()) : ?>
            <div class="image" style="background-image: url(<?php echo $url; ?>)">
                <?php the_post_thumbnail('medium'); ?>
            </div>
        <?php endif; ?>


        <div class="text">
            <h4 class="super"><?php echo ucfirst(c_get_type()) ?> vom <?php echo get_the_date('d.m.Y') ?></h4>

            <h1>
                <?php the_title(); ?>
            </h1>

            <div class="excerpt">
                <?php the_excerpt() ?>
            </div>

            <div class="more">mehr</div>
        </div>
    </a>
</article>
