import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../../sceneUtils'

export const squireAction = (gamestate, token, title) => {
  const werewolves = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolfAndDreamwolf')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    werewolves
  }

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleAction(gamestate, token, {
    private_message: werewolves.length > 0 ? [...'action_werewolves', 'action_may_look', ...messageIdentifiers, 'POINT'] : ['action_no_werewolves'],
    uniqueInformation: { werewolves, answer_options: ['yes', 'no'] }
  })
}
