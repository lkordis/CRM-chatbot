var builder = require('botbuilder');

function ThumbnailCardBuilder(session, data) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.carousel)

    msg.attachments(
        data.map(value => {
            return new builder.HeroCard(session)
                .images(value.image_url.map(d => {
                    return builder.CardImage.create(session, d)
                }))
                .title(value.title)
                .subtitle(value.price)
                .buttons([
                    builder.CardAction.openUrl(session, value.details_url, 'Detalji'),
                    builder.CardAction.postBack(session, `${value.type}${value.id}`, 'Dodaj u košaricu')
                ])
                .text(value.details_text)
        })
    )

    return msg;
}

function SuggestedActionsBuilder(session, data) {
    var msg = new builder.Message(session)
        .suggestedActions(
        builder.SuggestedActions.create(
            session, data.map(value => { return builder.CardAction.postBack(session, value.postback, value.title) })
        ));

    return msg;
}

module.exports = {
    ThumbnailCardBuilder: ThumbnailCardBuilder,
    SuggestedActionsBuilder: SuggestedActionsBuilder
}