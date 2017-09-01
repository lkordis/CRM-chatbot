var builder = require('botbuilder')

module.exports = [
    (session, args) => {
        if (args) {
            session.userData.loggedIn = args.loggedIn
            session.userData.name = args.name
            session.endDialog()
        }
        builder.Prompts.text(session, 'Upišite korisničko ime.')
    },
    (session, args, next) => {
        //Provjeriti korisničko ime
        session.userData.username = args.response
        //check(args.response)
        if (!true) {
            session.send("Upisano korisničko ime ne postoji. Molim upišite valjano korisničko ime.")
            session.replaceDialog('account')
        }
        else {
            var msg = new builder.Message(session)
                .attachments([
                    new builder.SigninCard(session).button('Prijava', require('../Utils/GoogleOAuth.js').auth_url(session)).text('Moj račun')
                ])
            session.send(msg)
        }
    },
    //Ako je prijava dobra, gotov je dijalog
    (session, args, next) => {

    }
]