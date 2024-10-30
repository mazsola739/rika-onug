import { formatPlayerIdentifier, generateRoleInteraction, getVillainPlayerNumbersByRoleIds } from '../../sceneUtils'

export const supervillainsInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const villains = getVillainPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    villains,
  }

  const messageIdentifiers = formatPlayerIdentifier(villains)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_villains', ...messageIdentifiers],
    uniqueInformations: { villains },
  })
}
