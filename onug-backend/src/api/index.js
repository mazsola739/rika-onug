const express = require('express')
const router = express.Router()

const { action } = require('./action')
const { hydrate } = require('./hydrate')
const { hydrateSelect } = require('./hydrate-select')
const { ready } = require('./ready')
const { rooms } = require('./rooms')
const { pageNotFoundError, internalServerError } = require('./error')

router.get('/rooms', rooms)
router.post('/hydrate', hydrate)
router.post('/hydrate-select', hydrateSelect)
router.post('/action', action)
router.post('/ready', ready)

module.exports = {
    apiRouter: router,
    pageNotFoundError,
    internalServerError
}