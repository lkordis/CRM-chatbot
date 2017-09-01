module.exports = bot => {
    bot.dialog('internet_service',
        function (session) {
            session.endDialog('Internetske usluge..')
        }
    ).triggerAction({
        matches: /^internet_service$/i,
    })

    bot.dialog('phone_service',
        function (session) {

        }
    ).triggerAction({
        matches: /^phone_service$/i,
    })

    bot.dialog('tv_service',
        function (session) {

        }
    ).triggerAction({
        matches: /^tv_service$/i,
    })

    bot.dialog('host_service',
        function (session) {

        }
    ).triggerAction({
        matches: /^host_service$/i,
    })

    bot.dialog('instruction_service',
        function (session) {

        }
    ).triggerAction({
        matches: /^instruction_service$/i,
    })

    return bot
}