import { formatPlayerIdentifier, generateRoleInteraction, getWerewolfAndDreamwolfPlayerNumbersByRoleIds } from '../../sceneUtils'

export const squireInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGamestate.players)

  if (werewolves.length === 0) {
    newGamestate.players[token].card.player_team = 'squire'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    werewolves
  }

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleInteraction(newGamestate, token, {
    private_message: werewolves.length > 0 ? [...'interaction_werewolves', 'interaction_may_look', ...messageIdentifiers] : ['interaction_no_werewolves'],
    uniqueInformations: { werewolves, answer_options: ['yes', 'no'] }
  })
}
