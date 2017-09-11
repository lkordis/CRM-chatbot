var builder = require('botbuilder'),
    { postData } = require('../Utils/DummyApi'),
    constants = require('../constants'),
    StructuredMessage = require('../Utils/StructuredMessage'),
    fs = require('fs');

//TODO : Dodati odgovore na česta pitanja
module.exports =
    [
        (session, results, next) => {
            fs.writeFile('../data.json', JSON.stringify(results), 'utf-8');
            if (!session.conversationData.loggedIn) {
                session.send('Molim prijavite se prije nego što opišete svoj kvar')
                session.beginDialog('login', { dialog_name: 'malfunction' })
            } else {
                builder.Prompts.text(session, "Molim opišite svoj kvar")

                var ponuda_type = results.entities.find(value => {
                    return value.type === 'ponuda_type'
                })

                if (ponuda_type) {
                    switch (ponuda_type.entity) {
                        case 'internet':
                            session.conversationData.type = 'internet'
                            break;
                        case 'tv':
                            session.conversationData.type = 'tv'
                            break;
                        case 'phone':
                            session.conversationData.type = 'phone'
                            break;
                        default:
                            break;
                    }
                } else {
                    // else kvar_postbacks ... endWithResults
                    session.beginDialog('malfunction_postbacks')
                }
            }
        },
        (session, args, next) => {
            postData(`${constants.malfunction_url}/${session.conversationData.type}`
                , {
                    title: session.conversationData.type,
                    details: args.response
                },
                session.conversationData.token)
                .then(data => {
                    console.log(data)
                    session.conversationData.type = ''
                    session
                        .send('Vaš kvar je zaprimljen, u nastavku su priloženi odgovori na česta pitanja koji bi Vam mogli pomoći.')
                        .endDialog()
                }).catch(err => console.log(err))
        }
    ]