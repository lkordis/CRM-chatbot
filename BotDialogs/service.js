var builder = require('botbuilder');
var { SuggestedActionsBuilder } = require('../Utils/StructuredMessage')

module.exports =
    [
        (session, args, next) => {
            if (args) { next(args) }
            var msg = SuggestedActionsBuilder(session,
                [
                    { postback: 'home_service', title: 'Za kuću' },
                    { postback: 'company_service', title: 'Za tvrtke' }
                ]
            ).text('Odaberite željenu vstu usluga')

            session.endDialog(msg)
        },
        (session, args, next) => {
            switch (args.type) {
                case 'company':
                    var msg = SuggestedActionsBuilder(session,
                        [
                            { postback: 'internet_service', title: 'Internet' },
                            { postback: 'phone_service', title: 'Glasovne usluge' },
                            { postback: 'data_service', title: 'Podatkovne usluge' },
                            { postback: 'host_service', title: 'Web hosting' }
                        ]
                    ).text('Odaberite željenu uslugu')
                    session.endDialog(msg)
                    break;
                case 'home':
                    session.replaceDialog('offer', { response: 'sve' })
                    break;
                default:
                    break;
            }
        }
    ]