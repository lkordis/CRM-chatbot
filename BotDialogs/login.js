var builder = require('botbuilder')

module.exports = [
    (session, args, next) => {
        if (args) {
            session.userData.loggedIn = args.loggedIn
            session.userData.name = args.name
            session.endDialog()
        }
        if (session.userData.loggedIn) { session.endDialog() }
        else {
            var msg = new builder.Message(session)
                .attachments([
                    new builder.SigninCard(session).button('Prijava', require('../Utils/GoogleOAuth.js').auth_url(session)).text('Moj račun')
                ])
            session.send(msg)
        }
    }
]