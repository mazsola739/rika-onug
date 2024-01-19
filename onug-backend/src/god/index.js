const express = require('express')
const router = express.Router()

const { checkGameStates } = require('./check-game-states')
const { deleteAllGameStates } = require('./delete-all-game-states')
const { checkConnections } = require('./check-connections')

// gamestates
router.get('/check-game-states', checkGameStates)
router.get('/delete-all-game-states', deleteAllGameStates)

// ws
router.get('/check-connections', checkConnections)

// meta

module.exports = {
    godRouter: router,
}