import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const squireAction = (gamestate, token, title) => {
  const werewolves = getPlayerNumbersByGivenConditions(gamestate, 'werewolfAndDreamwolf')
  const answer_options = ['yes', 'no']

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleAction(gamestate, token, title, {
    private_message: werewolves.length > 0 ? [...'action_werewolves', 'action_may_look', ...messageIdentifiers, 'POINT'] : ['action_no_werewolves'],
    uniqueInformation: { werewolves, answer_options }
  })
}
