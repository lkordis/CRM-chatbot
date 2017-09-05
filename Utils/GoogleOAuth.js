var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;

var oauth2Client = new OAuth2(
    '425560798335-95p3mebhpt7dm3fueuefrtg6c4cl64qh.apps.googleusercontent.com',
    'lYkvBV9aVdMPYs1TtCGD9qaR',
    'https://sedamitbot.localtunnel.me/oauthcallback'
);

var scopes = [
    'https://www.googleapis.com/auth/plus.me',
    'https://www.googleapis.com/auth/calendar'
];

function getPlus(oauth2Client, bot, adress, dialog) {
    var plus = google.plus('v1');

    plus.people.get({
        userId: 'me',
        auth: oauth2Client
    }, function (err, response) {
        // handle err and response
        bot.beginDialog(adress, "login",
            {
                loggedIn: true,
                name: response.displayName,
                dialog_name: dialog
            }
        );
    });
}

module.exports.auth_url = (session, dialog) => {
    return oauth2Client.generateAuthUrl({
        // 'online' (default) or 'offline' (gets refresh_token)
        access_type: 'online',

        // If you only need one scope you can pass it as a string
        scope: scopes,
    }) + "&state=" + encodeURIComponent(JSON.stringify({ adress: session.message.address, dialog_name: dialog }))
}

module.exports.getPlus = getPlus
module.exports.oauth2Client = oauth2Client