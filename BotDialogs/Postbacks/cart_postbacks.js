module.exports = bot => {
    bot.dialog('add_net_postback', require('../add_to_cart').add_net)
        .triggerAction({
            matches: /net\d+/i,
            onSelectAction: (session, args, next) => {
                session.beginDialog(args.action, args);
            }
        })

    bot.dialog('add_all_postback', require('../add_to_cart').add_all)
        .triggerAction({
            matches: /paket\d+/i,
            onSelectAction: (session, args, next) => {
                session.beginDialog(args.action, args);
            }
        })

    return bot
}