var request = require('request')

module.exports.getData = url => {
    console.log(url)
    return new Promise((resolve, reject) => {
        request(url, function (error, response, body) {
            if (error) reject(error)
            resolve(JSON.parse(response.body))
        })
    })
}
