var builder = require('botbuilder');
const fs = require('fs')

const urls = require('../constants.js'),
    { getData } = require('../Utils/DummyApi'),
    { RichCardBuilder } = require('../Utils/StructuredMessage.js')

const { WitRecognizer } = require('botbuilder-wit');
const Wit = new WitRecognizer('PMFEF3TFSSX3O6TFWIDXHC4Y4AYD7WX2')

module.exports = [
    (session, args, next) => {
        if (args) { next(args) }
        else { builder.Prompts.text(session, "Koja Vas usluga zanima?") }
    },
    (session, results) => {
        Wit.witClient.message(results.response).then(data => {
            // fs.writeFile('./data.json', JSON.stringify(data), 'utf-8');
            if (data.entities.ponuda_type) {
                var value = data.entities.ponuda_type[0].value

                switch (value) {
                    case 'sve':
                        getData(`${urls.product_url}/paket`)
                            .then(data => {
                                var msg = RichCardBuilder(session, data)
                                session.send(msg).endDialog()
                            })
                        break;
                    case 'internet':
                        getData(`${urls.product_url}/net`)
                            .then(data => {
                                var msg = RichCardBuilder(session, data)
                                session.send(msg).endDialog()
                            })
                        break;
                    case 'tv':
                        session.endDialog("Ponude za tv")
                        break;
                    case 'telefon':
                        session.endDialog('Ponude za telefon')
                        break;
                    default:
                        break;
                }
            } else {
                session.send("Upisana usluga ne postoji, molim upišite valjanu uslugu.")
                session.replaceDialog('offer')
            }
        })
    }]