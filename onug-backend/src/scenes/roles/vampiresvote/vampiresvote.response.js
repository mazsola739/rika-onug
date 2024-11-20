import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'

export const vampiresvoteResponse = async (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const vampire_votes = { ...newGamestate.vampire_votes }
  const voteCounts = Object.entries(vampire_votes)
  const voteResultPlayerNumber = voteCounts[0][0]

  const vampirePosition = newGamestate.mark_positions.vampire
  const selectedPosition = newGamestate.card_positions[voteResultPlayerNumber].mark

  newGamestate.mark_positions.vampire = selectedPosition
  newGamestate.card_positions[voteResultPlayerNumber].mark = vampirePosition

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_vampire: [voteResultPlayerNumber],
    scene_end: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier([voteResultPlayerNumber])[0]],
    scene_end: true
  })
}
