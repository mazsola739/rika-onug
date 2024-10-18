import { logTrace } from '../log'
import { validateRoom } from '../validators'
import { upsertRoomState } from '../repository'
import { STAGES } from '../constants'
import { broadcast } from './connections'
import { REDIRECT } from '../constants'
import { startScene } from '../scenes/startScene'

export const startGame = async (ws, message) => {
  const { room_id, token } = message

  logTrace(`Everybody is ready, game started in: ${room_id}`)
  // TODO different room validator, should prevent multiple game starts
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))

  const startTime = Date.now()
  
  let newGamestate = {
    ...gamestate,
    stage: STAGES.GAME,
    game_play_start_time: startTime,
    game_paused: false,
    actual_scene: {
      scene_title: "GAME_START",
      scene_number: 0,
      scene_start_time: startTime,
      scene_end_time: 0,
    },
  }

  logTrace(`Game started by player [${token}], in room [${room_id}], with startTime: [${startTime}]`)

  // TODO validate player
  await upsertRoomState(newGamestate)

  const startGame = {
    type: REDIRECT,
    path: `/game/${room_id}`
  }

  startScene(gamestate.room_id)
  
  return broadcast(room_id, startGame)
}
