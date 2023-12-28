const {generateSuccessResponse} = require("../../util/response-generator");
const joinRoomController = (event) => {
    console.log(`Join-room endpoint triggered with event: ${JSON.stringify(event)}`)

    return generateSuccessResponse({
        message: `successfully joined`
    })
}

module.exports = {
    joinRoomController
}