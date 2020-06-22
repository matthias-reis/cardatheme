<div class="list-grid latest-items">
    <?php $count = 0;?>
    <?php if (have_posts()): while (have_posts()) : the_post(); ?>
        <?php 
            $count++;
            get_template_part('app/article', 'list');
            
            if($count === 3) {
                // close div
                echo '</div>';
                if(is_home()) {
                    get_template_part('app/personal');
                }
                echo '<div class="list-grid all-items" id="infinite-scroll-container" typeof="sx:carda.InfiniteScroll">';
            }
        ?>
    <?php endwhile; ?>
    <?php 
        if($count === 1) {
            echo '<div class="placeholder"></div>';
            echo '<div class="placeholder"></div>';
        }
        if($count === 2) {
            echo '<div class="placeholder"></div>';
        }
    ?>
    <?php else: ?>
        <article>
            <h4>Fehler 404</h4>
            <h2>Leider nichts gefunden ...</h2>
        </article>
    <?php endif; ?>
</div>
<nav id="article-nav" class="invisible">
    <div>
        <?php posts_nav_link('', 'Neuere Beiträge laden', 'Weitere Beiträge laden'); ?>
    </div>
</nav>
