var builder = require('botbuilder');
var { SuggestedActionsBuilder } = require('../Utils/StructuredMessage')

module.exports =
    (session) => {
        var msg = SuggestedActionsBuilder(session,
            [
                { postback: 'internet_service', title: 'Internet' },
                { postback: 'phone_service', title: 'Telefon' },
                { postback: 'tv_service', title: 'Tv' },
                { postback: 'host_service', title: 'Web hosting' },
                { postback: 'intruction_service', title: 'Upute' }
            ]
        ).text('Odaberite željenu uslugu')

        session.endDialog(msg)
    }