import { HYDRATE_ROOM, JOIN_ROOM, STAGES } from '../../constants'
import roomsData from '../../data/rooms.json'
import { logErrorWithStack, logTrace, logWarn } from '../../log'
import { upsertRoomState } from '../../repository'
import { getPlayerNames } from '../../utils'
import { validateRoom } from '../../validators'
import { addUserToRoom, broadcast } from '../../utils/connections.utils'

export const joinRoom = async (ws, message) => {
  logTrace(`join-room requested with ${JSON.stringify(message)}`)

  try {
    const { room_id, nickname, token } = message
    const roomIndex = roomsData.findIndex(room => room.room_id === room_id)

    if (roomIndex === -1) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          success: false,
          errors: ['Room does not exist.']
        })
      )
    }

    const room = roomsData[roomIndex]
    const [roomIdValid, gamestate] = await validateRoom(room_id)

    if (gamestate && Object.keys(gamestate.players).length >= 12) {
      return ws.send(
        JSON.stringify({
          type: JOIN_ROOM,
          success: false,
          errors: ['Room is full. No more players can join.']
        })
      )
    }

    if (!roomIdValid) {
      const newGamestate = {
        ...room,
        selected_cards: room.selected_cards,
        selected_expansions: room.selected_expansions,
        stage: STAGES.ROOM,
        players: {
          [token]: { name: nickname, admin: true, flag: false }
        }
      }

      try {
        await upsertRoomState(newGamestate)
      } catch (error) {
        logWarn(`Error updating room state for new room: ${error.message}`)
        return ws.send(
          JSON.stringify({
            type: JOIN_ROOM,
            success: false,
            errors: ['Failed to save room state. Please try again.']
          })
        )
      }
    } else {
      const isAdmin = Object.values(gamestate.players).every(player => !player.admin)

      gamestate.players[token] = {
        name: nickname,
        admin: isAdmin,
        flag: false
      }

      try {
        await upsertRoomState(gamestate)
      } catch (error) {
        logWarn(`Error updating room state: ${error.message}`)
        return ws.send(
          JSON.stringify({
            type: JOIN_ROOM,
            success: false,
            errors: ['Failed to save room state. Please try again.']
          })
        )
      }
    }

    addUserToRoom(ws, token, room_id)

    const players = getPlayerNames(gamestate)

    broadcast(room_id, {
      type: HYDRATE_ROOM,
      success: true,
      selected_cards: gamestate.selected_cards,
      selected_expansions: gamestate.selected_expansions,
      players
    })

    return ws.send(
      JSON.stringify({
        type: JOIN_ROOM,
        success: true,
        message: 'Successfully joined',
        room_id,
        player: { name: nickname }
      })
    )
  } catch (error) {
    logErrorWithStack(error)

    ws.send(
      JSON.stringify({
        type: JOIN_ROOM,
        success: false,
        errors: ['An unexpected error occurred. Please try again.']
      })
    )
  }
}
