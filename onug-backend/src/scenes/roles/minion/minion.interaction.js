import { formatPlayerIdentifier, generateRoleInteraction, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../sceneUtils'

export const minionInteraction = (gamestate, token, title) => {
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(gamestate.players)

  if (werewolves.length === 0) {
    gamestate.players[token].card.player_team = 'minion'
  } /* TODO set it at the end? */

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    scene_end: true,
    werewolves
  }

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleInteraction(gamestate, token, {
    private_message: werewolves.length > 0 ? ['interaction_werewolves', ...messageIdentifiers] : ['interaction_no_werewolves'],
    scene_end: true,
    uniqueInformations: { werewolves, scene_end: true }
  })
}
