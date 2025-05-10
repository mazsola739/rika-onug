import { VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../utils'
import { generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

//TODO empath votes ALL send
export const empathResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  gamestate.players[token].empath_vote = selected_card_positions[0]

  const getEmpathTokensByRoleIds = players => {
    const result = []

    for (const token in players) {
      const player = players[token]
      if (player.card.player_role_id === 77 && player.card.player_original_id !== 1) {
        result.push(token)
      }
    }

    return result
  }
  const getDoppelgangerEmpathTokensByRoleIds = players => {
    const result = []

    for (const token in players) {
      const player = players[token]
      if (player.card.player_role_id === 77 && player.card.player_original_id === 1) {
        result.push(token)
      }
    }

    return result
  }

  const empathTokens = title === 'empath' ? getEmpathTokensByRoleIds(gamestate.plyers) : getDoppelgangerEmpathTokensByRoleIds(gamestate.plyers)

  empathTokens.forEach(empathToken => {
    webSocketServerConnectionsPerRoom[gamestate.room_id][empathToken].send(
      JSON.stringify({
        type: VOTE
      })
    )
  })

  const action = generateRoleAction(gamestate, token, title, {
    private_message: ['action_voted', formatPlayerIdentifier(selected_card_positions)[0]],
    uniqueInformation: { empath_vote: [selected_card_positions[0]] }
  })

  const narration = getNarrationByTitle(title, gamestate.scenes.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
