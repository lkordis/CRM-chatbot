var builder = require('botbuilder'),
    { loginUrl } = require('../Utils/DummyApi')

module.exports = [
    (session, args, next) => {
        if (args.user) {
            session.conversationData.loggedIn = true
            session.conversationData.name = args.user.profile.firstName
            session.conversationData.token = args.token
            session.replaceDialog(args.dialog_name)
        }
        if (session.conversationData.loggedIn) { session.endDialog() }
        else {
            var msg = new builder.Message(session)
                .attachments([
                    new builder.HeroCard(session).buttons([
                        builder.CardAction.openUrl(session, loginUrl(session.message.address, args.dialog_name, 'login'), 'Prijava'),
                        builder.CardAction.openUrl(session, loginUrl(session.message.address, args.dialog_name, 'register'), 'Registracija')
                    ])
                ])
            session.send(msg)
        }
    }
]