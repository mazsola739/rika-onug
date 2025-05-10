import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const minionAction = (gamestate, token, title) => {
  const werewolves = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolfAndDreamwolf')

  /* if (werewolves.length === 0) {
    gamestate.players[token].card.player_team = 'minion'
  } TODO set it at the end? */

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleAction(gamestate, token, title, {
    private_message: werewolves.length > 0 ? ['action_werewolves', ...messageIdentifiers, 'POINT'] : ['action_no_werewolves'],
    scene_end: true,
    uniqueInformation: { werewolves }
  })
}
