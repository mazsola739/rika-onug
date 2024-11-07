import { formatPlayerIdentifier, generateRoleInteraction, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../sceneUtils'

export const minionInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGamestate.players)

  if (werewolves.length === 0) {
    newGamestate.players[token].card.player_team = 'minion'
  } /* TODO set it at the end? */

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    scene_end: true,
    werewolves
  }

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_werewolves', ...messageIdentifiers],
    scene_end: true,
    uniqueInformations: { werewolves, scene_end: true }
  })
}
