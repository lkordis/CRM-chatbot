const DummyApi = require('../../Utils/DummyApi'),
    builder = require('botbuilder'),
    constants = require('../../constants'),
    Structured = require('../../Utils/StructuredMessage')

module.exports = bot => {
    bot.dialog('kosarica_postback',
        function (session) {
            DummyApi.getData(constants.cart_url, session.conversationData.token)
                .then(data => {
                    if (!data) session.endDialog("Vaša košarica je prazna")

                    var msg = Structured.TextCardBuilder(session, data.products).text("Vaša košarica")
                    session.send(msg)
                    session.endDialog(new builder.Message(session)
                        .attachments(
                        [new builder.HeroCard(session)
                            .buttons([
                                builder.CardAction.postBack(session, `buy${data._id}`, 'Kupi'),
                                builder.CardAction.postBack(session, 'remove_cart', 'Ukloni')
                            ])
                        ])
                    )
                })
        }
    ).triggerAction({
        matches: /^kosarica_postback$/i,
    })

    bot.dialog('stanje_postback',
        function (session) {
            DummyApi.getData(constants.account_url, session.conversationData.token)
                .then(res => {
                    var msg = Structured.ReceiptCardBuilder(session, res).text("Vaše usluge")
                    // session.send(`Račun - ${res.cost}kn/mj`)
                    // var msg = Structured.RichCardBuilder(session, res.products).text("Vaše usluge")
                    session.send(msg).endDialog()
                })
        }
    ).triggerAction({
        matches: /^stanje_postback$/i,
    })

    bot.dialog('odjava_postback',
        function (session) {
            session.conversationData = {}
            session.endDialog("Odjava izvršena")
        }
    ).triggerAction({
        matches: /^odjava_postback$/i,
    })

    return bot
}