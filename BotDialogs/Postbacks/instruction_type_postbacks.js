var { TextCardBuilder } = require('../../Utils/StructuredMessage.js'),
    { getData } = require('../../Utils/DummyApi'),
    constants = require('../../constants')

module.exports = bot => {
    bot.dialog('internet_instr',
        function (session) {
            getData(`${constants.support_url}/internet`).then(data => {
                var msg = TextCardBuilder(session, data)
                session.endDialog(msg)
            })
        }
    ).triggerAction({
        matches: /^internet_instr$/i,
    })

    bot.dialog('tv_instr',
        function (session) {
            getData(`${constants.support_url}/tv`).then(data => {
                var msg = TextCardBuilder(session, data)
                session.endDialog(msg)
            })
        }
    ).triggerAction({
        matches: /^tv_instr$/i,
    })

    bot.dialog('phone_instr',
        function (session) {
            getData(`${constants.support_url}/phone`).then(data => {
                var msg = TextCardBuilder(session, data)
                session.endDialog(msg)
            })
        }
    ).triggerAction({
        matches: /^phone_instr$/i,
    })

    bot.dialog('web_instr',
        function (session) {
            getData(`${constants.support_url}/web_hosting`).then(data => {
                var msg = TextCardBuilder(session, data)
                session.endDialog(msg)
            })
        }
    ).triggerAction({
        matches: /^web_instr$/i,
    })

    return bot
}