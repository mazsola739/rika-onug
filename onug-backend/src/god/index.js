const express = require('express')
const router = express.Router()

const { checkGameStates } = require('./check-game-states')
const { checkGameStateByRoomId } = require('./check-game-state-by-room-id')
const { deleteAllGameStates } = require('./delete-all-game-states')
const { deleteGameStateByRoomId } = require('./delete-game-state-by-room-id')
const { deleteAllPlayers } = require('./delete-all-players')
const { deletePlayerByToken } = require('./delete-player-by-token')
const { checkConnections } = require('./check-connections')
const { metaListOnugEnv } = require('./meta-list-onug-env')
const { metaDeleteAllOldLogFiles } = require('./meta-delete-all-old-log-files')

// gamestates
router.get('/check-game-states', checkGameStates)
router.get('/check-game-state-by-room-id', checkGameStateByRoomId)
router.get('/delete-all-game-states', deleteAllGameStates)
router.get('/delete-game-state-by-room-id', deleteGameStateByRoomId)

// ws
router.get('/check-connections', checkConnections)

//! TODO removing players does not handle available_names, and admin rights right now. TODO fix it.
router.get('/delete-all-players', deleteAllPlayers)
router.get('/delete-player-by-token', deletePlayerByToken)

// meta
router.get('/list-onug-env-vars', metaListOnugEnv)
router.get('/delete-all-old-log-files', metaDeleteAllOldLogFiles)

module.exports = {
    godRouter: router,
}