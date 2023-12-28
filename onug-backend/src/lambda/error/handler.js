const {generateErrorResponse} = require("../../util/response-generator");
const errorController = (event) => {
    console.log(`error endpoint triggered with event: ${JSON.stringify(event)}`)

    return generateErrorResponse(`well, that does not seem to work, please check that your post body has a valid route field filled in. Your request body was: ${JSON.stringify(event.body)}`)
}

module.exports = {
    errorController
}