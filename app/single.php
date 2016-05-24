<?php if (have_posts()): while (have_posts()) : the_post(); ?>
  <?php if (is_page()): ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('gallery-article'); ?>>
      <?php get_template_part('app/article', 'page'); ?>
    </article>
  <?php elseif (get_post_type() == 'remote'): ?>
    <article id="net-<?php the_ID(); ?>" <?php post_class('link-article'); ?>>
      <?php get_template_part('app/article', 'remote'); ?>
    </article>
  <?php elseif (c_is_type('galerie')): ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('gallery-article'); ?>>
      <?php get_template_part('app/article', 'gallery'); ?>
    </article>
  <?php elseif (c_is_type('galerierechts')): ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('gallery-article'); ?>>
      <?php get_template_part('app/article', 'galleryright'); ?>
    </article>
  <?php else: ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('single-article'); ?>>
      <?php get_template_part('app/article', 'single'); ?>
    </article>
  <?php endif; ?>
<?php endwhile; ?>

<?php else: ?>
  <section class="notfound ribbon ribbon-dark">
    <h2>Nichts gefunden</h2>
  </section>
<?php endif; ?>
