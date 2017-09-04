var builder = require('botbuilder');
const fs = require('fs')

const { getAll, getNet } = require('../Utils/DummyApi.js')
const { RichCardBuilder } = require('../Utils/StructuredMessage.js')

const { WitRecognizer } = require('botbuilder-wit');
const Wit = new WitRecognizer('PMFEF3TFSSX3O6TFWIDXHC4Y4AYD7WX2')

module.exports = [
    (session, args, next) => {
        if (args) { next(args) }
        else { builder.Prompts.text(session, "Koja Vas usluga zanima?") }
    },
    (session, results) => {
        console.log(results.response)
        Wit.witClient.message(results.response).then(data => {
            // fs.writeFile('./data.json', JSON.stringify(data), 'utf-8');
            if (data.entities.ponuda_type) {
                var value = data.entities.ponuda_type[0].value

                switch (value) {
                    case 'sve':
                        var msg = RichCardBuilder(session, getAll(require('../Data/ponuda_paketi.json').data))
                        session.send(msg).endDialog()
                        break;
                    case 'internet':
                        console.log("tu sam")
                        var msg = RichCardBuilder(session, getNet(require('../Data/ponuda_internet.json').data))
                        session.send(msg).endDialog()
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