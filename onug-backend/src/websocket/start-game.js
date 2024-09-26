import { logTrace } from '../log'
import { validateRoom } from '../validator'
import { upsertRoomState } from '../repository'
import { STAGES } from '../constants'
import { broadcast } from './connections'
import { REDIRECT } from '../constants'
import { startGamePlay } from '../scenes/game-play'

export const startGame = async (ws, message) => {
  const { room_id, token } = message

  logTrace(`Everybody is ready, game started in: ${room_id}`)
  // TODO different room validator, should prevent multiple game starts
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))

  const startTime = Date.now()
  
  let newGamestate = {
    ...gamestate,
    stage: STAGES.GAME_PLAY,
    game_play_start_time: startTime,
    actual_scene: {
      scene_title: "GAME_START",
      scene_number: 0,
      scene_start_time: startTime,
    },
  }

  logTrace(`Game started by player [${token}], in room [${room_id}], with startTime: [${startTime}]`)

  // TODO validate player
  await upsertRoomState(newGamestate)

  const startGame = {
    type: REDIRECT,
    path: `/gameplay/${room_id}`
  }

  startGamePlay(gamestate.room_id)
  
  return broadcast(room_id, startGame)
}
