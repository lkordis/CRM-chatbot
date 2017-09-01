module.exports =
    [
        (session, results, next) => {
            session.send("Molim opišite svoj kvar")
            next()
        },
        (session, args, next) => {
            if (!session.userData.loggedIn) {
                session.beginDialog('login')
            }
        },
        
    ]