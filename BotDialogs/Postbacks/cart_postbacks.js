const constants = require('../../constants'),
    { postData, deleteData } = require('../../Utils/DummyApi')

module.exports = bot => {
    bot.dialog('add_to_cart_postback', [
        (session, args, next) => {
            if (session.conversationData.loggedIn) {
                next(args)
            } else {
                session.beginDialog('login', { dialog_name: 'add_to_cart_postback' })
            }
        },
        (session, args) => {
            var id = args.intent.matched[0].substring(4)
            var data = postData(constants.cart_url, { item: id }, session.conversationData.token)
                .then(data => {
                    session.endDialog(`Paket ${data.title} dodan u košaricu.`)
                })
        }])
        .triggerAction({
            matches: /cart\w+/i,
            onSelectAction: (session, args, next) => {
                session.beginDialog(args.action, args);
            }
        })

    bot.dialog('buy_cart_postback',
        (session, args, next) => {
            var id = args.intent.matched[0].substring(3)
            var data = postData(constants.cart_buy_url, { cart: id }, session.conversationData.token)
                .then(data => {
                    session.endDialog(`Košarica kupljena`)
                })
        })
        .triggerAction({
            matches: /buy\w+/i,
            onSelectAction: (session, args, next) => {
                session.beginDialog(args.action, args);
            }
        })

    bot.dialog('remove_cart_postback',
        (session, args, next) => {
            var data = deleteData(constants.cart_url, session.conversationData.token)
                .then(data => {
                    session.endDialog(`Košarica uklonjena`)
                })
        })
        .triggerAction({
            matches: /^remove_cart$/i,
            onSelectAction: (session, args, next) => {
                session.beginDialog(args.action, args);
            }
        })
    return bot
}