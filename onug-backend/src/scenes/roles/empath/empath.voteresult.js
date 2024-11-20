import { findMostVoted, formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'

export const empathVoteResult = (gamestate, token, title) => {
  const mostVotedPlayer = findMostVoted(gamestate.empath_votes)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title]
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_vote_result', formatPlayerIdentifier(mostVotedPlayer)[0]]
  })
}
