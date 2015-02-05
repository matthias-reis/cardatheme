<div class="comments" id="comments">
    <p>Kommentare: <?php comments_number()?></p>
    <?php if (post_password_required()) : ?>
        <p class="message">Dieser Beitrag ist passwortgeschützt. Geben Sie es bitte ein, wenn Sie Kommentare lesen oder verfassen möchten.</p>
    <?php else: ?>
        <?php if (have_comments()) : ?>
            <h2><?php comments_number(); ?></h2>

            <ul>
                <?php wp_list_comments(); // Custom callback in functions.php ?>
            </ul>

        <?php elseif (!comments_open() && !is_page() && post_type_supports(get_post_type(), 'comments')) : ?>
            <p class="message">Die Kommentare wurden geschlossen.</p>
        <?php endif; ?>

        <?php comment_form(); ?>
    <?php endif; ?>
</div>
