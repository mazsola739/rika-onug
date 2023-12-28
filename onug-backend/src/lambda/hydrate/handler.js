const {generateSuccessResponse} = require("../../util/response-generator");
const hydrateController = async (event) => {
    console.log(`Hydrate endpoint triggered with event: ${JSON.stringify(event)}`)

    return generateSuccessResponse({
        message: `successfully hydrated`,
    })
}

module.exports = {
    hydrateController
}