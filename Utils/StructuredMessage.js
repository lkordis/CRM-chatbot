var builder = require('botbuilder');

function RichCardBuilder(session, data) {

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
                    builder.CardAction.postBack(session, `cart${value._id}`, 'Dodaj u košaricu')
                ])
                .text(value.details)
        })
    )

    return msg
}

function TextCardBuilder(session, data) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.list)

    msg.attachments(
        data.map(value => {
            return new builder.HeroCard(session)
                .title(value.title)
                .buttons([
                    builder.CardAction.openUrl(session, value.details_url, 'Detalji'),
                ])
                .text(value.details)
        })
    )

    return msg
}

function ReceiptCardBuilder(session, data) {
    var msg = new builder.Message(session);
    msg.attachmentLayout(builder.AttachmentLayout.list)

    msg.attachments([
        new builder.ReceiptCard(session)
            .title(`${data.user.profile.firstName} ${data.user.profile.lastName}`)
            .facts([
                builder.Fact.create(session, data.user.email, 'Email')
            ])
            .items(data.products.map(p => {
                return builder.ReceiptItem.create(session, p.price, p.title).quantity(1)
            }))
            .total(data.cost)]
    )

    return msg
}

function SuggestedActionsBuilder(session, data) {
    var msg = new builder.Message(session)

    if (session.message.address.channelId === 'skype' ||
        session.message.address.channelId === 'slack') {
        msg.attachments([
            new builder.HeroCard(session)
                .title("Ponuđene opcije")
                .buttons(data.map(value => { return builder.CardAction.postBack(session, value.postback, value.title) }))
        ])
    }
    else {
        msg.suggestedActions(
            builder.SuggestedActions.create(
                session, data.map(value => { return builder.CardAction.postBack(session, value.postback, value.title) })
            ));
    }
    return msg;
}

module.exports = {
    RichCardBuilder: RichCardBuilder,
    SuggestedActionsBuilder: SuggestedActionsBuilder,
    TextCardBuilder: TextCardBuilder,
    ReceiptCardBuilder: ReceiptCardBuilder
}