<?php the_post() ?>

<section class="headline archive-headline">

    <?php
if (is_day()) : ?>
        <h1>Tagesarchiv</h1>
        <h3>vom <?php echo get_the_time('d. F Y'); ?></h3>
    <?php
    elseif (is_month()) : ?>
        <h1>Monatsarchiv</h1>
        <h3>des Monats <?php echo get_the_time('F Y'); ?></h3>
    <?php
    elseif (is_search()) : ?>
        <h1>&laquo;<?php echo get_search_query(); ?>&raquo;</h1>
        <h3>Deine Suchergebnisse</h3>
    <?php
    elseif (is_year()) : ?>
        <h1>Jahresarchiv</h1>
        <h3>des Jahres <?php echo get_the_time('Y'); ?></h3>
    <?php
    elseif (get_post_type() === 'remote') : ?>
        <h1>Publikationen</h1>
        <h3>Arbeiten für Zeitschriften und Newsportale</h3>
    <?php
    elseif (is_category()) : ?>
        <h1>&laquo;<?php 
            $paging = get_query_var('paged') > 0 ? (' (' . get_query_var('paged') . ')') : '';
            echo single_cat_title() . $paging;
        ?>&raquo;</h1>
        <h3>Kategorie</h3>
    <?php
    elseif (is_tag()) : ?>
        <h1>&laquo;<?php echo single_tag_title(); ?>&raquo;</h1>
        <h3>Stichwort</h3>
    <?php
    else : ?>
        <div class="hl">
            <h3>Anne bloggt</h3>
            <h1>Cardamonchai</h1>
            <h2>Rock 'n' Roll Vegan</h2>
        </div>
    <?php endif; ?>
</section>

<?php rewind_posts() ?>
