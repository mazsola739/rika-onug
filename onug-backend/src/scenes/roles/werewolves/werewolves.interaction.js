import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleInteraction } from '../../sceneUtils'
import { getDreamWolfPlayerNumberByRoleIds, getWerewolfPlayerNumbersByRoleIds } from './werewolves.utils'

export const werewolvesInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const werewolves = getWerewolfPlayerNumbersByRoleIds(newGamestate.players)
  const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGamestate.players)
  const loneWolf = werewolves.length + dreamwolf.length === 1
  const selectable_cards = loneWolf ? CENTER_CARD_POSITIONS : []
  const selectable_card_limit = { player: 0, center: loneWolf ? 1 : 0 }
  const obligatory = loneWolf ? false : true
  const scene_end = loneWolf ? false : true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
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
    privateMessage = ['interaction_may_one_center']
  } else if (werewolves.length > 0 && dreamwolf.length === 0) {
    privateMessage = ['interaction_werewolves', ...messageIdentifiersWerewolves]
  } else if (werewolves.length === 1 && dreamwolf.length > 0) {
    privateMessage = ['interaction_no_werewolves', 'interaction_dreamwolf', ...messageIdentifiersDreamWolves]
  } else if (werewolves.length > 0 && dreamwolf.length > 0) {
    privateMessage = ['interaction_werewolves', ...messageIdentifiersWerewolves, 'interaction_dreamwolf', ...messageIdentifiersDreamWolves]
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory,
    scene_end,
    uniqueInformations: { werewolves, dreamwolf }
  })
}
