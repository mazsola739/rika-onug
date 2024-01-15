const { logTrace } = require('../log')
exports.ready = async (req, res) => {
    logTrace(`Ready endpoint triggered with request body: ${JSON.stringify(req.body)}`)

    return res.send({
        message: `ready / not ready`,
    })
}
