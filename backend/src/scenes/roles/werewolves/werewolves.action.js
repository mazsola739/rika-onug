import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const werewolvesAction = (gamestate, token, title) => {
  const werewolves = getPlayerNumbersByGivenConditions(gamestate.players, 'werewolf')
  const dreamwolf = getPlayerNumbersByGivenConditions(gamestate.players, 'dreamwolf')

  const loneWolf = werewolves.length + dreamwolf.length === 1
  const scene_end = !loneWolf
  const obligatory = loneWolf

  const selectable_cards = loneWolf ? CENTER_CARD_POSITIONS : []
  const selectable_card_limit = { player: 0, center: loneWolf ? 1 : 0 }

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

  const werewolvesMessage = werewolves.length > 0 ? ['action_werewolves', ...messageIdentifiersWerewolves] : ['action_no_werewolves']
  const dreamwolfMessage = dreamwolf.length > 0 ? ['action_dreamwolf', ...messageIdentifiersDreamWolves] : []

  const privateMessage = loneWolf ? ['action_may_one_center'] : [...werewolvesMessage, ...dreamwolfMessage, 'POINT']

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory,
    scene_end,
    uniqueInformation: { werewolves, dreamwolf }
  })
}
