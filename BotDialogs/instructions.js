const { SuggestedActionsBuilder } = require('../Utils/StructuredMessage.js')

module.exports =
    (session, results) => {
        if (results) {
            switch (results.intent.entities[0].entity) {
                case 'internet':
                    session.replaceDialog('internet_instr')
                    break;
                case 'tv':
                    session.replaceDialog('tv_instr')
                    break;
                case 'telefon':
                    session.replaceDialog('phone_instr')
                    break;
                case 'web hosting':
                    session.replaceDialog('web_instr')
                    break;
                default:
                    break;
            }
        }
        // Ako sam došao putem postbacka
        else {
            const msg = SuggestedActionsBuilder(session,
                [
                    { title: 'Internet', postback: 'internet_instr' },
                    { title: 'Tv', postback: 'tv_instr' },
                    { title: 'Telefon', postback: 'phone_instr' },
                    { title: 'Web hosting', postback: 'web_instr' },
                    { title: 'Ostalo', postback: 'misc_instr' }
                ]
            ).text('Koje upute želite?')
            session.endDialog(msg)
        }
    }