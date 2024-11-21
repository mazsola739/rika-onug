import { formatPlayerIdentifier, generateRoleAction, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../sceneUtils'

export const squireInteraction = (gamestate, token, title) => {
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(gamestate.players)

  if (werewolves.length === 0) {
    gamestate.players[token].card.player_team = 'squire'
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    werewolves
  }

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleAction(gamestate, token, {
    private_message: werewolves.length > 0 ? [...'interaction_werewolves', 'interaction_may_look', ...messageIdentifiers] : ['interaction_no_werewolves'],
    uniqueInformations: { werewolves, answer_options: ['yes', 'no'] }
  })
}
