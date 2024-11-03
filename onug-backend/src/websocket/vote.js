import { ERROR, VOTE } from '../constants'
import { logError, logTrace } from '../log'
import { upsertRoomState } from '../repository'
import { getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens } from '../scenes/sceneUtils'
import { validateRoom } from '../validators'
import { sendMessageToPlayer } from './connections'

export const vote = async (ws, message) => {
  const { room_id } = message
  logTrace(`Processing vote in room: ${room_id}`)

  try {
    const [roomIdValid, gamestate, errors] = await validateRoom(room_id)

    if (!roomIdValid) {
      logError(`Room validation failed for room: ${room_id}`)
      return ws.send(
        JSON.stringify({ type: ERROR, success: false, errors })
      )
    }

    const { players } = gamestate
    const tokens = getAllPlayerTokens(players)
    const newGamestate = {
      ...gamestate,
      players: {
        ...players,
        ...Object.fromEntries(tokens.map(token => [token, { ...players[token], flag: false }]))
      }
    }

    tokens.forEach((token) => {
      const player = players[token]
      const otherPlayers = getPlayerNumbersWithNonMatchingTokens(players, [token])

      const voteMessage = {
        type: VOTE,
        token,
        interaction: {
          selectable_cards: otherPlayers,
          selectable_card_limit: { player: 1, center: 0 },
        },
        player: {
          player_name: player.name,
          player_number: player.player_number,
          player_card_id: player.card.player_card_id,
          player_role: player.card.player_role,
          player_team: player.card.player_team,
        },
        players: tokens.map((t) => ({
          player_number: players[t].player_number,
          player_name: players[t].name,
          flag: players[t].flag,
        })),
      }

      sendMessageToPlayer(room_id, token, voteMessage)
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
