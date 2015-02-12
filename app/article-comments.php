<div class="share">

</div>
<div class="comments">
    <h2>Diskutiere doch einfach mit</h2>
    <p class="message"><?php comments_number('Derzeit ist noch kein Kommentar vorhanden', 'Ein Kommentar ist bereits vorhanden', '% Kommentare zu diesem Thema')?></p>
    <?php if (post_password_required()) : ?>
        <p class="message">Dieser Beitrag ist passwortgeschützt. Geben Sie es bitte ein, wenn Sie Kommentare lesen oder verfassen möchten.</p>
    <?php else: ?>
        <?php if (have_comments()) : ?>

            <ul>
                <?php wp_list_comments(); // Custom callback in functions.php ?>
            </ul>

        <?php elseif (!comments_open() && !is_page() && post_type_supports(get_post_type(), 'comments')) : ?>
            <p class="message">Die Kommentare wurden geschlossen.</p>
        <?php endif; ?>

        <?php comment_form(); ?>
    <?php endif; ?>
</div>