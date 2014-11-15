<?php get_header(); ?>

<main role="main" class="row">
    <?php if (is_single()): ?>
        <?php get_template_part('app/single'); ?>
    <?php else: ?>
        <section class="<?php if (is_home()): ?>home<?php endif;?> small-12 large-8 xlarge-9 columns">
            <?php get_template_part('app/loop'); ?>
        </section>
    <?php endif; ?>
</main>

<?php get_footer(); ?>
