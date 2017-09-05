module.exports = bot => {
    bot.dialog('malfunction_postback',
        function (session) {
            session.replaceDialog('malfunction')
        }
    ).triggerAction({
        matches: /^malfunction_postback$/i,
    })

    bot.dialog('instructions_postback',
        function (session) {
            session.replaceDialog('instructions')
        }
    ).triggerAction({
        matches: /^instructions_postback$/i,
    })

    return bot
}