import { formatPlayerIdentifier, generateRoleAction, getAlienPlayerNumbersByRoleIds } from '../../sceneUtils'

export const leaderAction = (gamestate, token, title) => {
  const aliens = getAlienPlayerNumbersByRoleIds(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    aliens,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(aliens)

  return generateRoleAction(gamestate, token, {
    private_message: aliens.length > 0 ? ['action_aliens', ...messageIdentifiers] : ['action_no_aliens'],
    uniqueInformations: { aliens },
    scene_end: true
  })
}
