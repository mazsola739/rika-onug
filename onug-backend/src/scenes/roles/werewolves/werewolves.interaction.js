import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleInteraction } from '../../sceneUtils'
import { getDreamWolfPlayerNumberByRoleIds, getWerewolfPlayerNumbersByRoleIds } from './werewolves.utils'

export const werewolvesInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
  
    const werewolves = getWerewolfPlayerNumbersByRoleIds(newGamestate.players)
    const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGamestate.players)
    const loneWolf = werewolves.length + dreamwolf.length === 1
    const selectable_cards = loneWolf ? CENTER_CARD_POSITIONS : []
    const selectable_card_limit = { player: 0, center: loneWolf ? 1 : 0 }
    const obligatory = loneWolf ? false : true
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards, selectable_card_limit,
      werewolves,
      dreamwolf,
      obligatory
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: [loneWolf ? 'interaction_may_one_center' : 'interaction_werewolves'],
      selectableCards: { selectable_cards, selectable_card_limit},
      obligatory,
      uniqueInformations: { werewolves, dreamwolf },
    })
  }