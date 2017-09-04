var { TextCardBuilder } = require('../../Utils/StructuredMessage.js')

module.exports = bot => {
    bot.dialog('internet_service',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/usluge.json').internet)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^internet_service$/i,
    })

    bot.dialog('phone_service',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/usluge.json').phone)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^phone_service$/i,
    })

    bot.dialog('data_service',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/usluge.json').data)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^data_service$/i,
    })

    bot.dialog('host_service',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/usluge.json').hosting)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^host_service$/i,
    })

    bot.dialog('home_service',
        function (session) {
            session.replaceDialog('service', { type: 'home' })
        }
    ).triggerAction({
        matches: /^home_service$/i,
    })

    bot.dialog('company_service',
        function (session) {
            session.replaceDialog('service', { type: 'company' })
        }
    ).triggerAction({
        matches: /^company_service$/i,
    })

    return bot
}