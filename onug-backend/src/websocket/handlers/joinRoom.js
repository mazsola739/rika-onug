import { HYDRATE_ROOM, JOIN_ROOM, STAGES } from '../../constants'
import roomsData from '../../data/rooms.json'
import { logErrorWithStack, logTrace, logWarn } from '../../log'
import { upsertRoomState } from '../../repository'
import { getPlayerNames } from '../../utils'
import { validateRoom } from '../../validators'
import { addUserToRoom, broadcast } from '../../utils/connections.utils'

const randomPlayerName = (names = []) => names[~~(Math.random() * names.length)]

export const joinRoom = async (ws, message) => {
  logTrace(`join-room requested with ${JSON.stringify(message)}`)

  try {
    const { room_id, token } = message
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

    let player_name

    if (!roomIdValid) {
      if (room.available_names.length === 0) {
        return ws.send(
          JSON.stringify({
            type: JOIN_ROOM,
            success: false,
            errors: ['No more available names. Room is full.']
          })
        )
      }

      player_name = randomPlayerName(room.available_names)

      const newGamestate = {
        ...room,
        selected_cards: room.selected_cards,
        selected_expansions: room.selected_expansions,
        stage: STAGES.ROOM,
        players: {
          [token]: { name: player_name, admin: true, flag: false }
        },
        available_names: room.available_names.filter(name => name !== player_name)
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
      if (room.available_names.length === 0) {
        return ws.send(
          JSON.stringify({
            type: JOIN_ROOM,
            success: false,
            errors: ['No more available names. Room is full.']
          })
        )
      }

      player_name = randomPlayerName(gamestate.available_names)

      const isAdmin = Object.values(gamestate.players).every(player => !player.admin)

      gamestate.players[token] = {
        name: player_name,
        admin: isAdmin,
        flag: false
      }

      gamestate.available_names = gamestate.available_names.filter(name => name !== player_name)

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
        player: { player_name }
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
