const builder = require('botbuilder');
const { WitRecognizer } = require('botbuilder-wit');
const fs = require('fs')
const extend = require('util')._extend

const Wit = new WitRecognizer('PMFEF3TFSSX3O6TFWIDXHC4Y4AYD7WX2')

// Create chat connector for communicating with the Bot Framework Service
var connector = new builder.ChatConnector({
    appId: '129327af-1e32-41e1-b0d4-321e4dfecf8a',
    appPassword: "WfzcaGghpAVUPtxeMdktsQc"
});

var bot = new builder.UniversalBot(connector);

bot.set(`persistUserData`, false);

bot.recognizer(Wit);

//Quick replies
var quickReplies = require('botbuilder-quickreplies');
quickReplies.LocationPrompt.create(bot);
bot.use(quickReplies.QuickRepliesMiddleware);

//Bot dialogs
bot.dialog('/',
    function (session) {
        session.send("Pitajte bilo što, ili upišite 'pomoć'.")
    }
).beginDialogAction('RootHelpAction', 'root_help', { matches: 'help' })

bot.dialog("greeting", require('./BotDialogs/greeting.js'))
    .triggerAction({
        matches: 'pozdrav'
    })

bot.dialog('info_root', require('./BotDialogs/info_root.js'))
    .triggerAction({
        matches: 'info'
    })

bot.dialog('offer', require('./BotDialogs/offer.js'))
    .beginDialogAction('PonudaHelpAction', 'ponuda_help', { matches: 'help' })

bot.dialog('account', require('./BotDialogs/account.js'))
    .beginDialogAction('RacunHelpAction', 'racun_help', { matches: 'help' })

bot.dialog('help', require('./BotDialogs/help.js'))
    .triggerAction({
        matches: 'help'
    })

bot.dialog('service', require('./BotDialogs/service.js'))

bot.dialog('support', require('./BotDialogs/support.js'))
    .triggerAction({
        matches: 'zahtjev'
    })

bot.dialog('login', require('./BotDialogs/login.js'))
bot.dialog('malfunction', require('./BotDialogs/malfunction.js'))

//Events
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

bot = extend(bot,
    require('./BotDialogs/Postbacks/service_postbacks.js')(bot),
    require('./BotDialogs/context_help.js')(bot),
    require('./BotDialogs/Postbacks/cart_postbacks.js')(bot),
    require('./BotDialogs/Postbacks/menu_postbacks.js')(bot)
)

module.exports = bot