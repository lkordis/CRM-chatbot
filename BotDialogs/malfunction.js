var builder = require('botbuilder');

module.exports =
    [
        (session, results, next) => {
            if (!session.userData.loggedIn) {
                session.beginDialog('login', { dialog_name: 'malfunction' })
            } else {
                builder.Prompts.text(session, "Molim opišite svoj kvar")
                next(results)
            }

        },
        (session, args, next) => {
            // api... prijavi kvar
            session
                .send('Vaš kvar je zaprimljen, u nastavku su priloženi odgovori na česta pitanja koji bi Vam mogli pomoći.')
                .endDialog()
        }
    ]