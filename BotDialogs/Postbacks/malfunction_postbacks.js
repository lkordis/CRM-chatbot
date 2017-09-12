module.exports = bot => {
    bot.dialog('net_malfunction',
        function (session) {
            session.conversationData.type = 'internet'
            session.endDialog()
        }
    ).triggerAction({
        matches: /^net_malfunction$/i,
        onSelectAction: (session, args, next) => {
            session.beginDialog(args.action, args);
        }
    })

    bot.dialog('phone_malfunciton',
        function (session) {
            ssession.conversationData.type = 'phone'
            session.endDialog()
        }
    ).triggerAction({
        matches: /^phone_malfunciton$/i,
        onSelectAction: (session, args, next) => {
            session.beginDialog(args.action, args);
        }
    })

    bot.dialog('tv_malfunction',
        function (session) {
            session.conversationData.type = 'tv'
            session.endDialog()
        }
    ).triggerAction({
        matches: /^tv_malfunction$/i,
        onSelectAction: (session, args, next) => {
            session.beginDialog(args.action, args);
        }
    })
    return bot
}