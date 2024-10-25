import { logTrace } from '../log'
import { validateRoom } from '../validators'
import { upsertRoomState } from '../repository'
import { STAGES, REDIRECT } from '../constants'
import { broadcast } from './connections'
import { startScene } from '../scenes/startScene'
import { getNextScene } from '../scenes/getNextScene'

export const startGame = async (ws, message) => {
  const { room_id, token } = message
  logTrace(`Starting game in room: ${room_id}`)

  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)
  if (!roomIdValid) return ws.send(JSON.stringify({ type: REDIRECT, path: '/lobby', errors }))

  const startTime = Date.now()
  let newGamestate = startScene({
    ...gamestate,
    stage: STAGES.GAME,
    game_start_time: startTime,
    game_paused: false,
    game_started: true,
    game_stopped: false,
    game_finished: false,
    scene_locked: true,
    narration: [],
  })

  logTrace(`Game started by player [${token}] in room [${room_id}]`)
  await upsertRoomState(newGamestate)
  
  broadcast(room_id, { type: REDIRECT, path: `/game/${room_id}` })

  return getNextScene(newGamestate)
}
