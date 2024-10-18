import { findMostVoted, generateRoleInteraction, formatPlayerIdentifier } from "../../sceneUtils"

export const empathVoteResult = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const icon = newGamestate.empath.icon
  const mostVotedPlayer = findMostVoted(newGamestate.empath_votes)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    [icon]: [mostVotedPlayer[0]],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_vote_result', formatPlayerIdentifier(mostVotedPlayer)[0]],
    icon,
    uniqueInformations: { [icon]: [mostVotedPlayer[0]] },
  })
}
