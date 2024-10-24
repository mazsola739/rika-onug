import { getWerewolfAndDreamwolfPlayerNumbersByRoleIds, formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'

export const minionInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const werewolves = getWerewolfAndDreamwolfPlayerNumbersByRoleIds(newGamestate.players)

  if (werewolves.length === 0) {
    newGamestate.players[token].card.player_team = 'minion'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    werewolves,
  }

  const messageIdentifiers = formatPlayerIdentifier(werewolves)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_werewolves', ...messageIdentifiers],
    uniqueInformations: { werewolves },
  })
}
