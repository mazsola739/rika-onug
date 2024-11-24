import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const beholderAction = (gamestate, token, title) => {
  const seers = getPlayerNumbersByGivenConditions(gamestate.players, 'anySeer')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    seers
  }

  const messageIdentifiers = formatPlayerIdentifier(seers)

  return generateRoleAction(gamestate, token, {
    private_message: ['action_seers', ...messageIdentifiers, 'action_may_look'],
    uniqueInformations: { seers, answer_options: ['yes', 'no'] }
  })
}
