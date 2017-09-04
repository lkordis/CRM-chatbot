var builder = require('botbuilder');
const fs = require('fs');

var quickReplies = require('botbuilder-quickreplies');

function entityCheck(session, results, dialog) {
    if (results.intent.entities[0].rawEntity.entities) {
        var value = results.intent.entities[0].rawEntity.entities.ponuda_type[0].value
        var args = {}
        args.response = value
        session.replaceDialog(dialog, args)
    }
    else {
        session.replaceDialog(dialog)
    }
}

module.exports = [
    (session, results) => {
        fs.writeFile('./data.json', JSON.stringify(results), 'utf-8');

        // if (session.message.address.channelId === 'facebook') {
        //     quickReplies.LocationPrompt.beginDialog(session);
        // } else {
        switch (results.intent.entities[0].entity) {
            case 'racun':
                session.replaceDialog('account')
                break;
            case 'ponuda':
                entityCheck(session, results, 'offer')
                break;
            case 'usluga':
                entityCheck(session, results, 'service')
                break;
            default:
                break;
        }
    }
    // (session, args, next) => {
    //     if (args.response) {
    //         var location = args.response.entity;
    //         session.send(`Your location is : ${location.title}, Longitude: ${location.coordinates.long}, Latitude: ${location.coordinates.lat}`);
    //     }
    // }
]