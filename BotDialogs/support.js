const { SuggestedActionsBuilder } = require('../Utils/StructuredMessage.js')

module.exports =
    (session, results) => {
        if (results) {
            var zahtjev = results.intent.entities.find(value => { return value.type === 'zahtjev_type' })
            console.log(zahtjev)
            switch (zahtjev.entity) {
                case 'kvar':
                    session.replaceDialog('malfunction', results.intent)
                    break;
                case 'upute':
                    session.replaceDialog('instructions')
                    break;
                default:
                    break;
            }
        } else {
            const msg = SuggestedActionsBuilder(session,
                [
                    { title: 'Prijava kvara', postback: 'malfunction_postback' },
                    { title: 'Upute', postback: 'instructions_postback' }
                ])
            session.endDialog(msg)
        }
    }