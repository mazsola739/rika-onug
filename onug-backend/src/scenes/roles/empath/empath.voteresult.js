import { findMostVoted, formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'

export const empathVoteResult = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const mostVotedPlayer = findMostVoted(newGamestate.empath_votes)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title]
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_vote_result', formatPlayerIdentifier(mostVotedPlayer)[0]]
  })
}
