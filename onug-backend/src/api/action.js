const { logTrace } = require('../log')

exports.action = async (req, res) => {
    const { body } = req
    logTrace(`action endpoint triggered with request body: ${JSON.stringify(body)}`)

    return res.send({
        message: 'action confirmed',
    })
}
