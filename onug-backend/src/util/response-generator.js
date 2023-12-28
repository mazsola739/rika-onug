const generateErrorResponse = error => ({
    statusCode: 400,
    body: {
        error,
    }
})

const generateSuccessResponse = (body) => ({
    statusCode: 200,
    body,
})

module.exports = {
    generateErrorResponse,
    generateSuccessResponse,
}