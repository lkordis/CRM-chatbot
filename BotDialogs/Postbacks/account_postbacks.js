const DummyApi = require('../../Utils/DummyApi'),
    constants = require('../../constants'),
    Structured = require('../../Utils/StructuredMessage')

module.exports = bot => {
    bot.dialog('kosarica_postback',
        function (session) {

        }
    ).triggerAction({
        matches: /^kosarica_postback$/i,
    })

    bot.dialog('stanje_postback',
        function (session) {
            DummyApi.getData(constants.account_url, session.conversationData.token)
                .then(res => {
                    session.send(`Račun - ${res.cost}kn/mj`)
                    var msg = Structured.TextCardBuilder(session, res.services).text("Vaše usluge")
                    session.endDialog(msg)
                })
        }
    ).triggerAction({
        matches: /^stanje_postback$/i,
    })

    return bot
}