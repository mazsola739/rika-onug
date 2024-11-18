import { formatPlayerIdentifier, generateRoleInteraction, getAlienPlayerNumbersByRoleIds } from '../../sceneUtils'

export const leaderInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const aliens = getAlienPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    aliens
  }

  const messageIdentifiers = formatPlayerIdentifier(aliens)

  return generateRoleInteraction(newGamestate, token, {
    private_message: aliens.length > 0 ? ['interaction_aliens', ...messageIdentifiers] : ['interaction_no_aliens'],
    uniqueInformations: { aliens }
  })
}
