const express = require('express')
const router = express.Router()

const { checkGameStates } = require('./check-game-states')
const { checkGameStateByRoomId } = require('./check-game-state-by-room-id')
const { reInitAllGameStates } = require('./re-init-all-game-states')
const { deleteAllGameStates } = require('./delete-all-game-states')
const { deleteGameStateByRoomId } = require('./delete-game-state-by-room-id')
const { deleteAllPlayers } = require('./delete-all-players')
const { deletePlayerByToken } = require('./delete-player-by-token')
const { checkConnections } = require('./check-connections')
const { broadCastToAll } = require('./broadcast-to-all')
const { broadCastToAllInRoom } = require('./broadcast-to-all-in-room')
const { sendMessageToPlayer } = require('./send-message-to-player')
const { metaListOnugEnv } = require('./meta-list-onug-env')
const { metaDeleteAllOldLogFiles } = require('./meta-delete-all-old-log-files')

// gamestates
router.get('/check-game-states', checkGameStates)
router.get('/check-game-state-by-room-id', checkGameStateByRoomId)
router.get('/re-init-all-game-states', reInitAllGameStates)
router.get('/delete-all-game-states', deleteAllGameStates)
router.get('/delete-game-state-by-room-id', deleteGameStateByRoomId)

// ws
router.get('/check-connections', checkConnections)
router.post('/broadcast-to-all', broadCastToAll)
router.post('/broadcast-to-all-in-room', broadCastToAllInRoom)
router.post('/send-message-to-player', sendMessageToPlayer)

//! TODO removing players does not handle available_names, and admin rights right now. TODO fix it.
//! or just use re-init endpoint instead
router.get('/delete-all-players', deleteAllPlayers)
router.get('/delete-player-by-token', deletePlayerByToken)

// meta
router.get('/list-onug-env-vars', metaListOnugEnv)
router.get('/delete-all-old-log-files', metaDeleteAllOldLogFiles)

module.exports = {
    godRouter: router,
}