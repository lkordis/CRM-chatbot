var builder = require('botbuilder');
var { SuggestedActionsBuilder } = require('../Utils/StructuredMessage')

module.exports = [
    (session, args, next) => {
        if (session.userData.logged_in) {
            next(session.userData.username)
        } else {
            session.beginDialog('login')
        }
    },
    (session, args, next) => {
        var msg = SuggestedActionsBuilder(session,
            [
                { postback: 'kosarica_postback', title: 'Moja košarica' },
                { postback: 'stanje_postback', title: 'Stanje računa' }
            ]
        ).text(`Dobrodošli, ${session.userData.name}.`)

        session.send(msg).endDialog()
    }
]