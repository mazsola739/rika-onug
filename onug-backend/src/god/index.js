import express from 'express'
import { checkGamestates } from './check-gamestates'
import { checkGamestateByRoomId } from './check-gamestate-by-room-id'
import { reInitAllGamestates } from './re-init-all-gamestates'
import { deleteAllGamestates } from './delete-all-gamestates'
import { deleteGamestateByRoomId } from './delete-gamestate-by-room-id'
import { deleteAllPlayers } from './delete-all-players'
import { deletePlayerByToken } from './delete-player-by-token'
import { checkConnections } from './check-connections'
import { broadCastToAll } from './broadcast-to-all'
import { broadCastToAllInRoom } from './broadcast-to-all-in-room'
import { sendMessageToPlayer } from './send-message-to-player'
import { metaListOnugEnv } from './meta-list-onug-env'
import { metaDeleteAllOldLogFiles } from './meta-delete-all-old-log-files'

const router = express.Router()

// gamestates
router.get('/check-gamestates', checkGamestates)
router.get('/check-gamestate-by-room-id', checkGamestateByRoomId)
router.get('/re-init-all-gamestates', reInitAllGamestates)
router.get('/delete-all-gamestates', deleteAllGamestates)
router.get('/delete-gamestate-by-room-id', deleteGamestateByRoomId)

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

export const godRouter = router
