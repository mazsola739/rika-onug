import { VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import {
  addVote,
  formatPlayerIdentifier,
  generateRoleInteraction,
  getNarrationByTitle,
} from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'
import {
  getDoppelgangerEmpathTokensByRoleIds,
  getEmpathTokensByRoleIds,
} from './empath.utils'

//TODO empath votes ALL send
export const empathResponse = (
  gamestate,
  token,
  selected_card_positions,
  title
) => {
  if (
    !validateCardSelection(
      selected_card_positions,
      gamestate.players[token].player_history,
      title
    )
  ) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const votes = addVote(
    newGamestate.players[token].player_number,
    selected_card_positions[0],
    newGamestate.empath_votes
  )

  newGamestate.players[token].empath_vote = selected_card_positions[0]
  newGamestate.empath_votes = votes

  const empathTokens =
    title === 'empath'
      ? getEmpathTokensByRoleIds(newGamestate.plyers)
      : getDoppelgangerEmpathTokensByRoleIds(newGamestate.plyers)

  empathTokens.forEach((empathToken) => {
    webSocketServerConnectionsPerRoom[newGamestate.room_id][empathToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    empath_vote: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: [
      'interaction_voted',
      formatPlayerIdentifier(selected_card_positions)[0],
    ],
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
