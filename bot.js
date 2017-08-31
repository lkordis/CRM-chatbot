var builder = require('botbuilder');
const { WitRecognizer } = require('botbuilder-wit');
const fs = require('fs')

const Wit = new WitRecognizer('PMFEF3TFSSX3O6TFWIDXHC4Y4AYD7WX2')

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '129327af-1e32-41e1-b0d4-321e4dfecf8a',
    appPassword: "WfzcaGghpAVUPtxeMdktsQc"
});

var bot = new builder.UniversalBot(connector, (session) => {
    session.send("Pitajte me bilo što!")
});

bot.recognizer(Wit);

//Quick replies
var quickReplies = require('botbuilder-quickreplies');
quickReplies.LocationPrompt.create(bot);
bot.use(quickReplies.QuickRepliesMiddleware);

//TODO: input check
bot.dialog("greeting", require('./BotDialogs/greeting.js'))
    .triggerAction({
        matches: 'pozdrav'
    })

bot.dialog('info_root', require('./BotDialogs/info_root.js'))
    .triggerAction({
        matches: 'info'
    })
    .beginDialogAction('RootHelpAction', 'root_help', { matches: 'help' })

bot.dialog('offer', require('./BotDialogs/offer.js'))
    .beginDialogAction('PonudaHelpAction', 'ponuda_help', { matches: 'help' })

bot.dialog('account', require('./BotDialogs/account.js'))
    .beginDialogAction('RacunHelpAction', 'racun_help', { matches: 'help' })

bot.dialog('help', require('./BotDialogs/help.js'))

bot.dialog('service', require('./BotDialogs/service.js'))

//Postback, events

bot.dialog('ponuda_help', (session) => {
    session.endDialog("Upišite net, tv, telefon ili sve.")
})

bot.dialog('ponuda_postback',
    function (session, args, next) {
        session.replaceDialog('offer')
    }
).triggerAction({
    matches: /^ponuda_postback$/i,
});

bot.dialog('racun_postback',
    function (session) {
        session.replaceDialog('account')
    }
).triggerAction({
    matches: /^racun_postback$/i,
})

bot.dialog('pomoc_postback',
    function (session) {
        session.replaceDialog('help')
    }
).triggerAction({
    matches: /^pomoc_postback$/i,
})

bot.dialog('add_net_postback', require('./BotDialogs/add_to_cart').add_net)
    .triggerAction({
        matches: /net\d+/i,
        onSelectAction: (session, args, next) => {
            session.beginDialog(args.action, args);
        }
    })

bot.dialog('add_all_postback', require('./BotDialogs/add_to_cart').add_all)
    .triggerAction({
        matches: /paket\d+/i,
        onSelectAction: (session, args, next) => {
            session.beginDialog(args.action, args);
        }
    })

bot.on('error', function (e) {
    console.log('Došlo je do pogreške', e);
});

bot.on('conversationUpdate', function (message) {
    if (message.membersAdded) {
        message.membersAdded.forEach(function (identity) {
            if (identity.id === message.address.bot.id) {
                bot.beginDialog(message.address, 'greeting');
            }
        });
    }
});

module.exports = bot