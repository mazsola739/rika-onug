import express from 'express';
const router = express.Router()

import { checkGameStates } from './check-game-states';
import { checkGameStateByRoomId } from './check-game-state-by-room-id';
import { reInitAllGameStates } from './re-init-all-game-states';
import { delete_all_gamestates } from './delete-all-game-states';
import { delete_gamestate_by_room_id } from './delete-game-state-by-room-id';
import { delete_all_players } from './delete-all-players';
import { delete_player_by_token } from './delete-player-by-token';
import { checkConnections } from './check-connections';
import { broadCastToAll } from './broadcast-to-all';
import { broadCastToAllInRoom } from './broadcast-to-all-in-room';
import { sendMessageToPlayer } from './send-message-to-player';
import { metaListOnugEnv } from './meta-list-onug-env';
import { metaDeleteAllOldLogFiles } from './meta-delete-all-old-log-files';

// gamestates
router.get('/check-game-states', checkGameStates)
router.get('/check-game-state-by-room-id', checkGameStateByRoomId)
router.get('/re-init-all-game-states', reInitAllGameStates)
router.get('/delete-all-game-states', delete_all_gamestates)
router.get('/delete-game-state-by-room-id', delete_gamestate_by_room_id)

// ws
router.get('/check-connections', checkConnections)
router.post('/broadcast-to-all', broadCastToAll)
router.post('/broadcast-to-all-in-room', broadCastToAllInRoom)
router.post('/send-message-to-player', sendMessageToPlayer)

//! TODO removing players does not handle available_names, and admin rights right now. TODO fix it.
//! or just use re-init endpoint instead
router.get('/delete-all-players', delete_all_players)
router.get('/delete-player-by-token', delete_player_by_token)

// meta
router.get('/list-onug-env-vars', metaListOnugEnv)
router.get('/delete-all-old-log-files', metaDeleteAllOldLogFiles)

export const godRouter = router
