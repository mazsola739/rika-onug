import { VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { formatPlayerIdentifier, generateRoleAction, getDoppelgangerEmpathTokensByRoleIds, getEmpathTokensByRoleIds, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'

import { validateCardSelection } from '../../validators'

//TODO empath votes ALL send
export const empathResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  gamestate.players[token].empath_vote = selected_card_positions[0]

  const empathTokens = title === 'empath' ? getEmpathTokensByRoleIds(gamestate.plyers) : getDoppelgangerEmpathTokensByRoleIds(gamestate.plyers)

  empathTokens.forEach(empathToken => {
    webSocketServerConnectionsPerRoom[gamestate.room_id][empathToken].send(
      JSON.stringify({
        type: VOTE
      })
    )
  })

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    empath_vote: [selected_card_positions[0]]
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_voted', formatPlayerIdentifier(selected_card_positions)[0]]
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
