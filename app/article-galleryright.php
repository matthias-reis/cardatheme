<?php get_template_part('app/article', 'gallery-headline'); ?>


<section class="article-text article-ribbon-gallery article-ribbon-gallery-right article-ribbon">
    <div class="row">
        <?php the_content(); ?>
    </div>
</section>

<section class="article-comment article-ribbon-comment">
    <div class="row">
        <?php comments_template('/app/article-comments.php'); ?>
    </div>
</section>

