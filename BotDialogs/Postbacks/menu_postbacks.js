module.exports = bot => {
    bot.dialog('ponuda_postback',
        function (session, args, next) {
            session.replaceDialog('offer')
        }
    ).triggerAction({
        matches: /^ponuda_postback$/i,
    });

    bot.dialog('racun_postback',
        function (session) {
            session.replaceDialog('account')
        }
    ).triggerAction({
        matches: /^racun_postback$/i,
    })

    bot.dialog('pomoc_postback',
        function (session) {
            session.replaceDialog('support')
        }
    ).triggerAction({
        matches: /^pomoc_postback$/i,
    })

    bot.dialog('usluga_postback',
        function (session) {
            session.replaceDialog('service')
        }
    ).triggerAction({
        matches: /^usluga_postback$/i,
    })

    return bot
}