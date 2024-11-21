import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleAction } from '../../sceneUtils'
import { getDreamWolfPlayerNumberByRoleIds, getWerewolfPlayerNumbersByRoleIds } from './werewolves.utils'

export const werewolvesAction = (gamestate, token, title) => {
  const werewolves = getWerewolfPlayerNumbersByRoleIds(gamestate.players)
  const dreamwolf = getDreamWolfPlayerNumberByRoleIds(gamestate.players)
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
    privateMessage = ['action_werewolves', ...messageIdentifiersWerewolves]
  } else if (werewolves.length === 1 && dreamwolf.length > 0) {
    privateMessage = ['action_no_werewolves', 'action_dreamwolf', ...messageIdentifiersDreamWolves]
  } else if (werewolves.length > 0 && dreamwolf.length > 0) {
    privateMessage = ['action_werewolves', ...messageIdentifiersWerewolves, 'action_dreamwolf', ...messageIdentifiersDreamWolves]
  }

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory,
    scene_end,
    uniqueInformations: { werewolves, dreamwolf }
  })
}
