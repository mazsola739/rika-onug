import express from 'express'
import { broadCastToAll } from './broadCastToAll'
import { broadCastToAllInRoom } from './broadCastToAllInRoom'
import { checkConnections } from './checkConnections'
import { checkGamestateByRoomId } from './checkGamestateByRoomId'
import { checkGamestates } from './checkGamestates'
import { deleteAllGamestates } from './deleteAllGamestates'
import { deleteAllPlayers } from './deleteAllPlayers'
import { deleteGamestateByRoomId } from './deleteGamestateByRoomId'
import { deletePlayerByToken } from './deletePlayerByToken'
import { metaDeleteAllOldLogFiles } from './metaDeleteAllOldLogFiles'
import { metaListOnugEnv } from './metaListOnugEnv'
import { reInitAllGamestates } from './reInitAllGamestates'
import { sendMessageToPlayer } from './sendMessageToPlayer'

const router = express.Router()

// gamestates
router.get('/check_gamestates', checkGamestates)
router.get('/check_gamestate_by_room_id', checkGamestateByRoomId)
router.get('/re_init_all_gamestates', reInitAllGamestates)
router.get('/delete_all_gamestates', deleteAllGamestates)
router.get('/delete_gamestate_by_room_id', deleteGamestateByRoomId)

// ws
router.get('/check_connections', checkConnections)
router.post('/broadcast_to_all', broadCastToAll)
router.post('/broadcast_to_all_in_room', broadCastToAllInRoom)
router.post('/send_message_to_player', sendMessageToPlayer)

//! TODO removing players does not handle available_names, and admin rights right now. TODO fix it.
//! or just use re-init endpoint instead
router.get('/delete_all_players', deleteAllPlayers)
router.get('/delete_player_by_token', deletePlayerByToken)

// meta
router.get('/list_onug_env_vars', metaListOnugEnv)
router.get('/delete_all_old_log_files', metaDeleteAllOldLogFiles)

export const godRouter = router
