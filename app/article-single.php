<?php get_template_part('app/article', 'headline'); ?>

<section class="article-text article-ribbon">
    
    <div id="c_interact" data-user-group=<?php c_is_internal() ? '"internal"' : '"public"' ?>></div>
    <div class="row">
        <?php the_content(); ?>
    </div>
</section>

<section class="article-comment article-ribbon-comment">
    <div class="row">
        <?php comments_template('/app/article-comments.php'); ?>
    </div>
</section>
