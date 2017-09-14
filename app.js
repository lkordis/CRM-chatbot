var restify = require('restify');
const bot = require('./bot.js');

// Setup Restify Server
var server = restify.createServer();
server.use(require('restify-plugins').queryParser());
server.listen(process.env.port || process.env.PORT || 80, function () {
    console.log('%s listening to %s', server.name, server.url);
});

// Listen for messages from users 
server.post('/api/messages', bot.connector('*').listen());

//login
server.post('/login_callback', (req, res, next) => {
    console.log(req.query.data)
    var address = JSON.parse(req.query.data).address
    var dialog_name = JSON.parse(req.query.data).dialog_name

    bot.beginDialog(address, 'login', JSON.parse(req.query.data))
    res.send(200)
})