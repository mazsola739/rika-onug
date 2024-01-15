const { logTrace } = require('../log')

exports.hydrate = async (req, res) => {
    const { body } = req
    logTrace(`hydrateController endpoint triggered with request body: ${JSON.stringify(body)}`)

    return res.send({
        message: 'successfully hydrated',
    })
}
