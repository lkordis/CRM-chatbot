var builder = require('botbuilder');
var { SuggestedActionsBuilder } = require('../Utils/StructuredMessage.js')

module.exports = function (session) {
    var msg = SuggestedActionsBuilder(session,
        [
            { postback: 'ponuda_postback', title: 'Ponuda' },
            { postback: 'racun_postback', title: 'Moj račun' },
            { postback: 'pomoc_postback', title: 'Pomoć i podrška' },
            { postback: 'usluga_postback', title: 'Usluge' }
        ]
    ).text("Zdravo, dobrodošli u CRM bot. Kako Vam mogu pomoći?")

    session.endDialog(msg);
}