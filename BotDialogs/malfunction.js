var builder = require('botbuilder');
const fs = require('fs');

//TODO : Dodati odgovore na česta pitanja
module.exports =
    [
        (session, results, next) => {
            fs.writeFile('./data.json', JSON.stringify(results), 'utf-8');
            if (!session.userData.loggedIn) {
                session.send('Molim prijavite se prije nego što opišete svoj kvar')
                session.beginDialog('login', { dialog_name: 'malfunction' })
            } else {
                var ponuda_type = results.entities.find(value => {
                    return value.type === 'ponuda_type'
                })

                if (ponuda_type) {
                    switch (ponuda_type.entity) {
                        case 'internet':
                        
                            break;

                        default:
                            break;
                    }
                }
                session.send('')
                next(results)
            }

        },
        (session, args, next) => {
            // api... prijavi kvar
            builder.Prompts.text(session, "Molim opišite svoj kvar")
            session
                .send('Vaš kvar je zaprimljen, u nastavku su priloženi odgovori na česta pitanja koji bi Vam mogli pomoći.')
                .endDialog()
        }
    ]