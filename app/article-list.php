
<?php $url = wp_get_attachment_url( get_post_thumbnail_id($post->ID) );?>
<article class="article-in-list list-grid-item" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
    <a class="article-item" href="<?php the_permalink(); ?>" title="<?php the_title(); ?>" style="background-image: url()">
        <div class="meta">
            <div class="publishing-date">
                <span><?php echo get_the_date('d') ?></span>
                <span><?php echo get_the_date('M') ?></span>
                <span><?php echo get_the_date('Y') ?></span>
            </div>
            <div class="type">
                <?php echo ucfirst(c_get_type()) ?>
            </div>
        </div>
        <?php if (has_post_thumbnail()) : ?>
            <div class="image" style="background-image: url(<?php echo $url; ?>)">
                <?php the_post_thumbnail('medium'); ?>
            </div>
        <?php endif; ?>


        <div class="text">
            <h1>
                <?php the_title(); ?>
            </h1>

            <div class="excerpt">
                <?php the_excerpt() ?>
            </div>
        </div>
    </a>
</article>
