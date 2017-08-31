var builder = require('botbuilder');
var { SuggestedActionsBuilder } = require('../Utils/StructuredMessage')

module.exports = [
    (session, args, next) => {
        if (session.userData.logged_in) {
            next(session.userData.username)
        } else {
            builder.Prompts.text(session, 'Upišite korisničko ime.')
        }
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
                    new builder.SigninCard(session).button('Prijava', '#').text('Moj račun')
                ])
            session.send(msg)
            next()
        }
    },
    (session, args, next) => {
        session.send(`Dobrodošli, ${session.userData.username}.`)
        var msg = SuggestedActionsBuilder(session,
            [
                { postback: 'kosarica_postback', title: 'Moja košarica' },
                { postback: 'stanje_postback', title: 'Stanje računa' }
            ]
        )

        session.send(msg).endDialog()
    }
]