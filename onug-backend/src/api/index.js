const express = require('express')
const router = express.Router()

const { action } = require('./action')
const { hydrate } = require('./hydrate')
const { hydrateSelect } = require('./hydrate-select')
const { joinRoom } = require('./join-room')
const { leaveRoom } = require('./leave-room')
const { ready } = require('./ready')
const { rooms } = require('./rooms')
const { updateSelect } = require('./update-select')
const { pageNotFoundError, internalServerError } = require('./error')

router.get('/rooms', rooms)
router.post('/join-room', joinRoom)
router.post('/leave-room', leaveRoom)
router.post('/hydrate', hydrate)
router.post('/hydrate-select', hydrateSelect)
router.post('/update-select', updateSelect)
router.post('/action', action)
router.post('/ready', ready)

module.exports = {
    apiRouter: router,
    pageNotFoundError,
    internalServerError
}