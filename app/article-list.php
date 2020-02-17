
<?php 
    $url = get_the_post_thumbnail_url($post->ID, 'large');
?>
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
            <div class="image" style="background-image: url(<?php echo $url ?>)">
                <?php the_post_thumbnail('large', ['sizes' => '400px']); ?>
            </div>
        <?php endif; ?>


        <div class="text">
            <h2>
                <?php the_title(); ?>
            </h2>

            <div class="excerpt">
            <?php
                $custom = get_post_custom();
                $url = $custom['url'][0];
                $desc = $custom['desc'][0];
                if ($desc) {
                    echo "<div>" . strip_tags($desc) . "</div>";
                } else {
                    echo str_replace('h2', 'h3', get_the_excerpt());
                }
                ?>
            </div>
        </div>
    </a>
</article>
</article>
