import { ERROR, VOTE } from '../../constants'
import { logError, logErrorWithStack, logTrace } from '../../log'
import { repo, repositoryType } from '../../repository'
import { getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens } from '../../scenes/sceneUtils'
import { sendMessage } from '../../utils'
import { validateRoom } from '../../validators'

export const startVote = async (ws, message) => {
  const { room_id } = message
  logTrace(`Processing verdict in room: ${room_id}`)

  try {
    const [validity, gamestate, errors] = await validateRoom(room_id)

    if (!validity) {
      logError(`Room validation failed for room: ${room_id}`)
      return sendMessage(ws, { type: ERROR, success: false, errors })
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

    //TODO vote restrict
    tokens.forEach(token => {
      const player = players[token]
      const otherPlayers = getPlayerNumbersWithNonMatchingTokens(players, [token])

      const voteMessage = {
        type: VOTE,
        success: true,
        token,
        action: {
          selectable_cards: otherPlayers,
          selectable_card_limit: { player: 1, center: 0 },
          show_cards: newGamestate.flipped_cards
        },
        player: {
          player_name: player.name,
          player_number: player.player_number,
          player_card_id: player.card.player_card_id,
          player_role: player.card.player_role,
          player_team: player.card.player_team
        },
        players: tokens.map(t => ({
          //TODO save into gamestate?
          player_number: players[t].player_number,
          player_name: players[t].name,
          flag: players[t].flag
        }))
      }

      /* TODO FIX!!!!! sendMessageToPlayer(room_id, token, voteMessage) */
    })

    await repo[repositoryType].upsertRoomState(newGamestate)
  } catch (error) {
    logErrorWithStack(error)
    //TODO fix this part
    sendMessage(ws, { type: VOTE, success: false, errors: ['An unexpected error occurred. Please try again.'] })
  }
}
