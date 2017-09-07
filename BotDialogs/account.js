var builder = require('botbuilder');
var { SuggestedActionsBuilder } = require('../Utils/StructuredMessage')

module.exports = [
    (session, args, next) => {
        if (session.conversationData.loggedIn) {
            next()
        } else {
            session.beginDialog('login', { dialog_name: 'account' })
        }
    },
    (session, args, next) => {
        var msg = SuggestedActionsBuilder(session,
            [
                { postback: 'kosarica_postback', title: 'Moja košarica' },
                { postback: 'stanje_postback', title: 'Stanje računa' }
            ]
        ).text(`Dobrodošli, ${session.conversationData.name}.`)

        session.send(msg).endDialog()
    }
]