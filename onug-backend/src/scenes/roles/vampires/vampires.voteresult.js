import { findMostVoted, formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'


//TODO better votes for new vampire
export const vampiresVoteResult = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  newGamestate.players[token].card_or_mark_action = true

  const mostVotedPlayer = findMostVoted(newGamestate.vampire_votes)

  const vampirePosition = newGamestate.mark_positions.vampire
  const selectedPosition = newGamestate.card_positions[mostVotedPlayer[0]].mark

  newGamestate.mark_positions.vampire = selectedPosition
  newGamestate.card_positions[mostVotedPlayer[0]].mark = vampirePosition

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_vampire: [mostVotedPlayer[0]],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier(mostVotedPlayer)[0]],
  })
}
