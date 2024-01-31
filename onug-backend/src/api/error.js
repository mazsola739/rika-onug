const { logError } = require("../log")

exports.pageNotFoundError = (req, res) => {
  logError(`page not found: ${req.originalUrl}`)
  res.status(404).send("error")
}

exports.internalServerError = (error, req, res) => {
  logError(`ERROR occurred: ${error.stack}`)
  res
    .status(500)
    .send(`500 | Sorry, the app could not handle the request properly`)
}
