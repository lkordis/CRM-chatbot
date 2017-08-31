module.exports.getAll = data => {
    var res = data.map(value => {
        var element = {
            image_url: value.image_url,
            title: value.title,
            details_url: value.details_url,
            details_text: `${value.internet} ${value.tel} ${value.tv}`,
            price: value.price,
            type: value.type,
            id: value.id
        }

        return element;
    })
    return res;
}

module.exports.getNet = data => {
    var res = data.map(value => {
        var element = {
            image_url: value.image_url,
            title: value.title,
            details_url: value.details_url,
            details_text: value.internet,
            price: value.price,
            type: value.type,
            id: value.id
        }

        return element;
    })
    return res;
}