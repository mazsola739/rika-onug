const express = require('express')
const router = express.Router()

const { rooms } = require('./rooms')
const { pageNotFoundError, internalServerError } = require('./error')

router.get('/rooms', rooms)

module.exports = {
    apiRouter: router,
    pageNotFoundError,
    internalServerError
}