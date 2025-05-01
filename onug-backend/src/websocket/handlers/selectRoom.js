import { logTrace, logErrorWithStack } from '../../log'
import { validateRoom } from '../../validators'
import roomsData from '../../data/rooms.json'
import { SELECT_ROOM, STAGES } from '../../constants'
import { sendMessage } from '../../utils'

export const selectRoom = async (ws, message) => {
  logTrace(`select-room requested with ${JSON.stringify(message)}`)
  const { room_id, nickname, token } = message
  try {
    const roomIndex = roomsData.findIndex(room => room.room_id === room_id)

    if (roomIndex === -1) return sendMessage(ws, { type: SELECT_ROOM, success: false, errors: ['Room does not exist.'] })

    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) return sendMessage(ws, { type: SELECT_ROOM, success: false, errors })

    if (gamestate.stage !== STAGES.LOBBY && gamestate.stage !== STAGES.ROOM) return sendMessage(ws, { type: SELECT_ROOM, success: false, errors: ['Room is closed / game started.'], stage: gamestate.stage })

    const playerNames = Object.values(gamestate.players).map(player => player.name)

    if (playerNames.includes(nickname)) return sendMessage(ws, { type: SELECT_ROOM, success: false, errors: ['Existing player name in the room, select a new nickname.'], stage: gamestate.stage })

    const playerCount = playerNames.length

    if (playerCount === 12) return sendMessage(ws, { type: SELECT_ROOM, success: false, errors: ['Room is full.'], stage: gamestate.stage })

    return sendMessage(ws, {
      type: SELECT_ROOM,
      success: true,
      room_id: gamestate.room_id,
      room_name: gamestate.room_name,
      stage: gamestate.stage,
      total_players: playerCount,
      player_names: playerNames,
      token
    })
  } catch (error) {
    logErrorWithStack(error)

    sendMessage(ws, {
      type: SELECT_ROOM,
      success: false,
      errors: ['An unexpected error occurred. Please try again.']
    })
  }
}
