import { VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { addVote, formatPlayerIdentifier, generateRoleInteraction, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'
import { getDoppelgangerEmpathTokensByRoleIds, getEmpathTokensByRoleIds } from './empath.utils'

//TODO empath votes ALL send
export const empathResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const votes = addVote(gamestate.players[token].player_number, selected_card_positions[0], gamestate.empath_votes)

  gamestate.players[token].empath_vote = selected_card_positions[0]
  gamestate.empath_votes = votes

  const empathTokens = title === 'empath' ? getEmpathTokensByRoleIds(gamestate.plyers) : getDoppelgangerEmpathTokensByRoleIds(gamestate.plyers)

  empathTokens.forEach(empathToken => {
    webSocketServerConnectionsPerRoom[gamestate.room_id][empathToken].send(
      JSON.stringify({
        type: VOTE,
        votes
      })
    )
  })

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    empath_vote: [selected_card_positions[0]]
  }

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_voted', formatPlayerIdentifier(selected_card_positions)[0]]
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
