<section class="ribbon ribbon-main">

    <?php
    if (is_day()) : ?>
        <h1>Tagesarchiv <strong><?php get_the_time('t. F Y'); ?></strong></h1>
    <?php
    elseif (is_month()) : ?>
        <h1>Monatsarchiv <strong><?php get_the_time('F Y'); ?></strong></h1>
    <?php
    elseif (is_year()) : ?>
        <h1>Jahresarchiv <strong><?php get_the_time('Y'); ?></strong></h1>
    <?php
    elseif (is_category()) : ?>
        <h1>Kategorie <strong><?php echo single_cat_title(); ?></strong></h1>
    <?php
    elseif (is_tag()) : ?>
        <h1>Stichwort <strong><?php echo single_tag_title(); ?></strong></h1>
    <?php
    else : ?>
        <h1>Herzlich Willkommen</h1>
    <?php endif; ?>
</section>
