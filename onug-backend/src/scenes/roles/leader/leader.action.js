import { formatPlayerIdentifier, generateRoleAction, getAlienPlayerNumbersByRoleIds } from '../../sceneUtils'

export const leaderInteraction = (gamestate, token, title) => {
  const aliens = getAlienPlayerNumbersByRoleIds(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    aliens
  }

  const messageIdentifiers = formatPlayerIdentifier(aliens)

  return generateRoleAction(gamestate, token, {
    private_message: aliens.length > 0 ? ['interaction_aliens', ...messageIdentifiers] : ['interaction_no_aliens'],
    uniqueInformations: { aliens }
  })
}
