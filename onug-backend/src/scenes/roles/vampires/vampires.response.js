import { VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { addVote, getVampirePlayerNumbersByRoleIds, getPlayerTokensByPlayerNumber, generateRoleInteraction, formatPlayerIdentifier } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const vampiresResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const votes = addVote(newGamestate.players[token].player_number, selected_mark_positions[0], newGamestate.vampire_votes)

  newGamestate.players[token].vampire_vote = selected_mark_positions[0]
  newGamestate.vampire_votes = votes

  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
  const vampireTokens = getPlayerTokensByPlayerNumber(newGamestate.players, vampires)

  vampireTokens.forEach((vampireToken) => {
    webSocketServerConnectionsPerRoom[newGamestate.room_id][vampireToken].send(
      JSON.stringify({
        type: VOTE,
        votes,
      })
    )
  })

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    vampires,
    vampire_vote: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_voted', formatPlayerIdentifier(selected_mark_positions)[0]],
    uniqueInformations: { vampires },
  })

  scene.push({ [token]: { interaction } })
  newGamestate.scene[title] = scene

  return newGamestate
}
