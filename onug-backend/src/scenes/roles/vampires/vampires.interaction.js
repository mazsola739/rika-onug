import { formatPlayerIdentifier, generateRoleInteraction, getVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

export const vampiresInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    vampires,
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(vampires)
  const privateMessage = vampires.length === 1 ? ['interaction_no_vampires'] : ['interaction_vampires', ...messageIdentifiers]

  return generateRoleInteraction(newGamestate, token, {
    private_message: [...privateMessage],
    uniqueInformations: { vampires },
    scene_end: true
  })
}
