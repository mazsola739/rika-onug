import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const werewolvesAction = (gamestate, token, title) => {
  const werewolves = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolf')
  const dreamwolf = getPlayerNumbersByGivenConditions(gamestate.players, 'dreamwolf')
  const loneWolf = werewolves.length + dreamwolf.length === 1
  const selectable_cards = loneWolf ? CENTER_CARD_POSITIONS : []
  const selectable_card_limit = { player: 0, center: loneWolf ? 1 : 0 }
  const obligatory = loneWolf ? false : true
  const scene_end = loneWolf ? false : true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
    werewolves,
    dreamwolf,
    obligatory
  }

  const messageIdentifiersWerewolves = formatPlayerIdentifier(werewolves)
  const messageIdentifiersDreamWolves = formatPlayerIdentifier(dreamwolf)

  let privateMessage = []

  if (loneWolf) {
    privateMessage = ['action_may_one_center']
  } else if (werewolves.length > 0 && dreamwolf.length === 0) {
    privateMessage = ['action_werewolves', ...messageIdentifiersWerewolves, 'POINT']
  } else if (werewolves.length === 1 && dreamwolf.length > 0) {
    privateMessage = ['action_no_werewolves', 'action_dreamwolf', ...messageIdentifiersDreamWolves, 'POINT']
  } else if (werewolves.length > 0 && dreamwolf.length > 0) {
    privateMessage = ['action_werewolves', ...messageIdentifiersWerewolves, 'action_dreamwolf', ...messageIdentifiersDreamWolves, 'POINT']
  }

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory,
    scene_end,
    uniqueInformation: { werewolves, dreamwolf }
  })
}
