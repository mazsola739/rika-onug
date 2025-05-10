import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const beholderAction = (gamestate, token, title) => {
  const seers = getPlayerNumbersByGivenConditions(gamestate.players, 'anySeer')
  const answer_options = ['yes', 'no']

  const uniqueInformation = {
    answer_options,
    seers
  }

  const messageIdentifiers = formatPlayerIdentifier(seers)

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_seers', ...messageIdentifiers, 'action_may_look'],
    uniqueInformation
  })
}
//
