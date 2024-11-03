import { ERROR, VOTE } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens } from '../scenes/sceneUtils'
import { validateRoom } from '../validators'
import { sendMessageToPlayer } from './connections'

export const vote = async (ws, message) => {
  const { room_id, /* token, voted */ } = message
  logTrace(`Processing vote in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(JSON.stringify({ type: ERROR, success: false, errors }))
    }

    let newGamestate = { ...gamestate }
    const { players } = newGamestate
    const tokens = getAllPlayerTokens(players)

    tokens.forEach((token) => {
      newGamestate.players[token].voted = false
      const otherPlayers = getPlayerNumbersWithNonMatchingTokens(players, [token])

      const player = players[token]
      
      const message = {
        type: VOTE,
        token,
        selectable_players: otherPlayers,
        player: {
          player_name: player.name,
          player_number: player.player_number,
          player_card_id: player.card.player_card_id,
          player_role: player.card.player_role,
          player_team: player.card.player_team
        },
        players: Object.values(gamestate.players).map((player) => ({
          player_number: player.player_number,
          player_name: player.name,
          ready: player.ready,
        })),
      }

      sendMessageToPlayer(gamestate.room_id, token, message)
    })

    await upsertRoomState(newGamestate)
  } catch (error) {
    logError(`Error processing vote in room: ${room_id}. Error: ${error.message}`)
    logError(JSON.stringify(error.stack))

    ws.send(
      JSON.stringify({
        type: ERROR,
        success: false,
        message: 'Failed to process vote. Please try again.',
      })
    )
  }
}
