var builder = require('botbuilder'),
    { postData, getData } = require('../Utils/DummyApi'),
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
                if (results) {
                    var ponuda_type = results.entities.find(value => {
                        return value.type === 'ponuda_type'
                    })

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
                    var msg = StructuredMessage.SuggestedActionsBuilder(session, [
                        { postback: 'net_malfunction', title: 'Internet' },
                        { postback: 'phone_malfunciton', title: 'Telefon' },
                        { postback: 'tv_malfunction', title: 'Tv' }
                    ]).text('Odaberite uslugu za koju želite prijaviti kvar.')

                    session.send(msg)
                }
            }
        },
        (session, args, next) => {
            builder.Prompts.text(session, "Molim opišite svoj kvar.")
        },
        (session, args, next) => {
            postData(`${constants.malfunction_url}/${session.conversationData.type}`
                , {
                    title: session.conversationData.type,
                    details: args.response
                },
                session.conversationData.token)
                .then(data => {
                    getData(`${constants.faq_url}/${session.conversationData.type}`)
                        .then(data => {
                            session.conversationData.type = ''
                            var msg = StructuredMessage.TextCardBuilder(session, data)
                                .text('Vaš kvar je zaprimljen, u nastavku su priloženi odgovori na česta pitanja koji bi Vam mogli pomoći.')
                            session
                                .send(msg)
                                .endDialog()
                        })
                }).catch(err => console.log(err))
        }
    ]