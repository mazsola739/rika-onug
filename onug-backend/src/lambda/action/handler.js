const {generateSuccessResponse} = require("../../util/response-generator");
const actionController = async (event) => {
    console.log(`action endpoint triggered with event: ${JSON.stringify(event)}`)

    return generateSuccessResponse({
        message: `action confirmed`,
    })
}

module.exports = {
    actionController
}