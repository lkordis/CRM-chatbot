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
    console.log(data)
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

module.exports.loginUrl = (address, dialog_name) => {
    return `http://localhost:3000/login?data=${encodeURI(JSON.stringify({
        redirect_url: 'http://localhost:80/login_callback',
        address: address,
        dialog_name: dialog_name
    }))}`
}
