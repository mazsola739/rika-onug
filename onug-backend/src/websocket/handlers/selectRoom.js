import { logTrace, logErrorWithStack } from "../../log"
import { validateRoom } from "../../validators"
import roomsData from '../../data/rooms.json'
import { SELECT_ROOM, STAGES } from "../../constants"

export const selectRoom = async (ws, message) => {
  logTrace(`select-room requested with ${JSON.stringify(message)}`)

  try {
    const { room_id, token } = message
    const roomIndex = roomsData.findIndex(room => room.room_id === room_id)

    if (roomIndex === -1) {
      return ws.send(
        JSON.stringify({
          type: SELECT_ROOM,
          success: false,
          errors: ["Room does not exist."]
        })
      )
    }

    const [roomIdValid, gamestate] = await validateRoom(room_id)

    if (!roomIdValid) {
      return ws.send(
        JSON.stringify({
          type: SELECT_ROOM,
          success: false,
          errors: ["Room is invalid."]
        })
      )
    }

    if (gamestate.stage !== STAGES.LOBBY && gamestate.stage !== STAGES.ROOM) {
      return ws.send(
        JSON.stringify({
          type: SELECT_ROOM,
          success: false,
          errors: ["Room is closed / game started."]
        })
      )
    }

    const playerNames = Object.values(gamestate.players).map(player => player.name)
    const playerCount = playerNames.length

    if (playerCount === 12) {
      return ws.send(
        JSON.stringify({
          type: SELECT_ROOM,
          success: false,
          errors: ["Room is full."]
        })
      )
    }

    return ws.send(
      JSON.stringify({
        type: SELECT_ROOM,
        success: true,
        room_id: gamestate.room_id,
        room_name: gamestate.room_name,
        stage: gamestate.stage,
        total_players: playerCount,
        player_names: playerNames,
        token
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: SELECT_ROOM,
        success: false,
        errors: ["An unexpected error occurred. Please try again."]
      })
    )
  }
}
