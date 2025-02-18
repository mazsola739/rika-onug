import { REDIRECT, STAGES } from '../../constants'
import { logTrace } from '../../log'
import { upsertRoomState } from '../../repository'
import { validateRoom } from '../../validators'
import { broadcast } from '../../utils/connections.utils'

//TODO do i need? fix it?
export const stopGame = async message => {
  const { room_id, token } = message
  logTrace(`Stopping game in room: ${room_id}`)
  const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

  if (!roomIdValid) return broadcast({ type: REDIRECT, path: '/lobby', errors })

  // TODO validate if player is admin and in the room

  const stopScene = gamestate => {
    gamestate.stage = STAGES.ROOM
    gamestate.game_started = false
    gamestate.game_stopped = true
    gamestate.game_finished = false
    gamestate.script_locked = true
    gamestate.chapter = []

    delete gamestate.narration
    delete gamestate.game_start_time

    gamestate.players = resetPlayers(gamestate.players)

    return gamestate
  }

  const resetPlayers = players => {
    return Object.fromEntries(
      Object.entries(players).map(([token, player]) => [
        token,
        {
          ...player,
          flag: false,
          card: null,
          player_number: null,
          card_or_mark_action: false,
          action_finished: true,
          player_history: {}
        }
      ])
    )
  }

  let newGamestate = stopScene(gamestate)

  logTrace(`Game stopped by player [${token}], in room [${room_id}]`)

  await upsertRoomState(newGamestate)

  broadcast(room_id, { type: REDIRECT, path: `/room/${room_id}` })
}
