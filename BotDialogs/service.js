var builder = require('botbuilder');
var { SuggestedActionsBuilder } = require('../Utils/StructuredMessage')

module.exports =
    (session) => {
        var msg = SuggestedActionsBuilder(session,
            [
                { postback: 'internet_service', title: 'Internet' },
                { postback: 'phone_postback', title: 'Telefon' },
                { postback: 'tv_postback', title: 'Tv' },
                { postback: 'host_postback', title: 'Web hosting' },
                { postback: 'intruction_postback', title: 'Upute' }
            ]
        ).text('Odaberite željenu uslugu')

        session.endDialog(msg)
    }