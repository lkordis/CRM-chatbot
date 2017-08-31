module.exports =
    (session, args) => {
        console.log(args)
        session.endDialog('Kako Vam mogu pomoći?')
    }