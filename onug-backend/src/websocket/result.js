import { ERROR, RESULT } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken } from '../scenes/sceneUtils'
import { validateRoom } from '../validators'
import { sendMessageToPlayer } from './connections'

export const result = async (ws, message) => {
  const { room_id, token, selected_card_positions } = message
  logTrace(`Processing vote in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: ERROR, success: false, errors }))
    }

    let newGamestate = { ...gamestate }
    newGamestate.players[token].voted = true
    newGamestate.players[token].vote = selected_card_positions

    const allVoted = Object.values(newGamestate.players).every(player => player.voted === true)

    if (allVoted) {
      const playerTokens = getAllPlayerTokens(newGamestate.players)

      playerTokens.forEach((playerToken) => {
        newGamestate.players[playerToken].voted = false

        const playerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, playerToken)
        const cardPosition = newGamestate.card_positions[playerNumber]

        newGamestate.players[playerToken].card = {
          player_card_id: cardPosition.card.id,
          player_role: cardPosition.card.role,
          player_team: cardPosition.card.team,
          player_mark: cardPosition.mark
        }

        const message = {
          type: RESULT,
          token: playerToken,
          player: {
            player_name: newGamestate.players[playerToken].name,
            player_number: newGamestate.players[playerToken].player_number,
            player_card_id: newGamestate.players[playerToken].card.player_card_id,
            player_role: newGamestate.players[playerToken].card.player_role,
            player_team: newGamestate.players[playerToken].card.player_team,
            player_mark: newGamestate.players[playerToken].card.player_mark
          },
          players: Object.values(newGamestate.players).map(player => ({
            player_name: player.name,
            player_number: player.player_number,
            player_card_id: player.card.player_card_id,
            player_role: player.card.player_role,
            player_team: player.card.player_team,
            player_mark: player.card.player_mark
          }))
        }

        sendMessageToPlayer(room_id, playerToken, message)
      })
    }

    await upsertRoomState(newGamestate)
  } catch (error) {
    logError(`Error processing result in room: ${room_id}. Error: ${error.message}`)
    logError(JSON.stringify(error.stack))

    ws.send(
      JSON.stringify({
        type: ERROR,
        success: false,
        message: 'Failed to process result. Please try again.'
      })
    )
  }
}
