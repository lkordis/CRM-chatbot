var builder = require('botbuilder');

module.exports = bot => {
    bot.dialog('ponuda_help', (session) => {
        session.endDialog("Upišite net, tv, telefon ili sve.")
    })

    bot.dialog('root_help', (session) => {
        var msg = new builder.Message(session).textFormat('xml')
        if (session.message.address.channelId === 'skype') msg.text("<b>Pomoć!</b>")
        else { msg.text("Pomoć") }

        session.send(msg)
        session.replaceDialog('greeting')
    })

    return bot
}