var { TextCardBuilder } = require('../../Utils/StructuredMessage.js')

module.exports = bot => {
    bot.dialog('internet_instr',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/upute.json').internet)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^internet_instr$/i,
    })

    bot.dialog('tv_instr',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/upute.json').tv)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^tv_instr$/i,
    })

    bot.dialog('phone_instr',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/upute.json').phone)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^phone_instr$/i,
    })

    bot.dialog('web_instr',
        function (session) {
            var msg = TextCardBuilder(session, require('../../Data/upute.json').web_hosting)
            session.endDialog(msg)
        }
    ).triggerAction({
        matches: /^web_instr$/i,
    })

    return bot
}