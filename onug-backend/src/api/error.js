const { logError, logErrorWithStack } = require("../log")

exports.pageNotFoundError = (req, res) => {
  try {
    throw new Error(`page not found: ${req.originalUrl}`)
  } catch(error) {
    logErrorWithStack(error)
    res.status(404).send("error")
  }
}

exports.internalServerError = (error, req, res) => {
  logError(`ERROR occurred: ${error.stack}`)
  res
    .status(500)
    .send(`500 | Sorry, the app could not handle the request properly`)
}
