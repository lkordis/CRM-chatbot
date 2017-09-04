module.exports =
    (session, results) => {
        switch (results.intent.entities[0].entity) {
            case 'kvar':
                session.replaceDialog('malfunction', results.intent)
                break;
            default:
                break;
        }
    }