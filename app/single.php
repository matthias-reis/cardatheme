<?php if (have_posts()): while (have_posts()) : the_post(); ?>

  <?php if (is_page()): ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('article-page'); ?>>
      <?php get_template_part('app/article', 'page'); ?>
    </article>
  <?php elseif (get_post_type() == 'remote'): ?>
    <article id="net-<?php the_ID(); ?>" <?php post_class('article-link'); ?>>
      <?php get_template_part('app/article', 'remote'); ?>
    </article>
  <?php elseif (c_is_type('galerie')): ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('article-gallery'); ?>>
      <?php get_template_part('app/article', 'gallery'); ?>
    </article>
  <?php elseif (c_is_type('galerierechts')): ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('article-gallery'); ?>>
      <?php get_template_part('app/article', 'galleryright'); ?>
    </article>
  <?php elseif (c_is_type('meme')): ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('article-meme'); ?>>
      <?php get_template_part('app/article', 'meme'); ?>
    </article>
  <?php else: ?>
    <article id="post-<?php the_ID(); ?>" <?php post_class('article'); ?>>
      <?php get_template_part('app/article', 'single'); ?>
    </article>
  <?php endif; ?>
<?php endwhile; ?>

<?php else: ?>
  <section class="notfound content-ribbon">
    <h2>Nichts gefunden</h2>
  </section>
<?php endif; ?>
