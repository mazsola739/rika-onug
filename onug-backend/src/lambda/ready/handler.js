const {generateSuccessResponse} = require("../../util/response-generator");
const readyController = (event) => {
    console.log(`Ready endpoint triggered with event: ${JSON.stringify(event)}`)

    return generateSuccessResponse({
        message: `ready / not ready`,
    })
}

module.exports = {
    readyController
}