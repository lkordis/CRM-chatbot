const { getAll, getNet } = require('../Utils/DummyApi.js')

module.exports.add_net =
    (session, args) => {
        var id = args.intent.matched[0].substring(3)
        var data = getNet(require('../Data/ponuda_internet.json').data)

        var net = data.find(element => {
            return element.id == id
        })

        if (session.conversationData.basket) {
            var basket = session.conversationData.basket
            session.conversationData.basket = basket.push(net)
        }
        else { session.conversationData.basket = [net] }
        session.save()

        session.endDialog(`Paket ${net.title} dodan u košaricu.`)
    }

module.exports.add_all =
    (session, args) => {
        var id = args.intent.matched[0].substring(5)
        var data = getAll(require('../Data/ponuda_paketi.json').data)

        var paket = data.find(element => {
            return element.id == id
        })

        if (session.conversationData.basket) {
            var basket = session.conversationData.basket
            basket.push(paket)
            session.conversationData.basket = basket
        }
        else { session.conversationData.basket = [paket] }
        session.save()

        session.endDialog(`Paket ${paket.title} dodan u košaricu.`)
    }