var builder = require('botbuilder')

module.exports = [
    (session, args, next) => {
        if (args.loggedIn) {
            session.userData.loggedIn = args.loggedIn
            session.userData.name = args.name
            session.replaceDialog(args.dialog_name)
        }
        if (session.userData.loggedIn) { session.endDialog() }
        else {
            var msg = new builder.Message(session)
                .attachments([
                    new builder.SigninCard(session).button('Prijava', require('../Utils/GoogleOAuth.js').auth_url(session, args.dialog_name))
                        .text('Moj račun')
                ])
            session.send(msg)
        }
    }
]