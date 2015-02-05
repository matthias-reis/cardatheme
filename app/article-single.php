<?php get_template_part('app/article', 'headline'); ?>

<section class="article-content ribbon ribbon-white">
    <section class="article-text ribbon ribbon-bright">
        <div class="row">
            <?php the_content(); ?>
        </div>
    </section>
    <section class="article-text ribbon ribbon-bright">
        <div class="row">
            <?php comments_template('/app/article-comments.php'); ?>
        </div>
    </section>
</section>

