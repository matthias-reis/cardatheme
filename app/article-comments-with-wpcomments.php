<?php get_template_part('app/article', 'disqus'); ?>
<?php if (comments_open()) : ?>
  <div class="comments">
    <?php comment_form(); ?>
    
    <h2>Kommentare</h2>

    <p class="message"><?php comments_number(
      'Derzeit ist noch kein Kommentar vorhanden',
      'Ein Kommentar ist bereits vorhanden',
      '% Kommentare zu diesem Thema'
    ) ?></p>
    <?php if (post_password_required()) : ?>
      <p class="message">Dieser Beitrag ist passwortgeschützt. Bitte gib es ein, 
        wenn Du Kommentare lesen oder verfassen möchtest.</p>
      <?php else: ?>
        <?php if (have_comments()) : ?>

          <ul>
            <?php wp_list_comments(); // Custom callback in functions.php ?>
          </ul>

        <?php elseif (!comments_open() && !is_page() && post_type_supports(get_post_type(), 'comments')) : ?>
          <p class="message">Die Kommentare wurden geschlossen.</p>
        <?php endif; ?>

      <?php endif; ?>
    </div>
    <div class="tags">
      <section>
        <h3>Erschienen in</h3>
        <p><?php the_category(' '); ?></p>
      </section>

      <section>
        <h3>Getaggt mit</h3>
        <p><?php the_tags('', ' ', ''); ?></p>
      </section>

    </div>
</div>
<?php endif; ?>
