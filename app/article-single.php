<?php get_template_part('app/article', 'headline'); ?>

<section class="article-content ribbon" typeof="sx:carda.Article">
    <section class="article-text ribbon">
        <div class="row hyphenate">
            <h2>
                <?php c_the_subhead(); ?>
            </h2>
            <?php the_content(); ?>
        </div>
    </section>
    <section class="article-comment ribbon ribbon-bright">
        <div class="row" property="socialTarget">
            <?php comments_template('/app/article-comments.php'); ?>
        </div>
    </section>
</section>

