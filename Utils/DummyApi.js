var request = require('request')

module.exports.getData = (url, token = '') => {
    var options = {
        url: url,
        headers: {
            authorization: token
        }
    }
    return new Promise((resolve, reject) => {
        request(options, function (error, response, body) {
            if (error) reject(error)
            resolve(JSON.parse(response.body))
        })
    })
}

module.exports.postData = (url, data, token) => {
    var options = {
        url: url,
        json: data,
        headers: {
            authorization: token,
            "content-type": "application/json"
        }
    }
    return new Promise((resolve, reject) => {
        request.post(options, function (error, response, body) {
            if (error) reject(error)
            resolve(response.body)
        })
    })
}

module.exports.deleteData = (url, token) => {
    var options = {
        url: url,
        headers: {
            authorization: token
        }
    }
    return new Promise((resolve, reject) => {
        request.delete(options, function (error, response, body) {
            if (error) reject(error)
            resolve(response.body)
        })
    })
}

module.exports.loginUrl = (address, dialog_name, type) => {
    return `https://sedam-it-bot.herokuapp.com/${type}?data=${encodeURI(JSON.stringify({
        redirect_url: 'http://localhost:80/login_callback',
        address: address,
        dialog_name: dialog_name
    }))}`
}
