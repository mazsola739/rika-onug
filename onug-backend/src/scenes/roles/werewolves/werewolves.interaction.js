import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleInteraction } from '../../sceneUtils'
import { getDreamWolfPlayerNumberByRoleIds, getWerewolfPlayerNumbersByRoleIds } from './werewolves.utils'

export const werewolvesInteraction = (gamestate, token, title) => {
    const newGamestate = { ...gamestate }
  
    const werewolves = getWerewolfPlayerNumbersByRoleIds(newGamestate.players)
    const dreamwolf = getDreamWolfPlayerNumberByRoleIds(newGamestate.players)
    const loneWolf = werewolves.length + dreamwolf.length === 1
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: loneWolf ? CENTER_CARD_POSITIONS : [], selectable_card_limit: { player: 0, center: 1 },
      werewolves,
      dreamwolf,
    }
  
    return generateRoleInteraction(newGamestate, token, {
      private_message: [loneWolf ? 'interaction_may_one_center' : 'interaction_werewolves'],
      selectableCards: { selectable_cards: loneWolf ? CENTER_CARD_POSITIONS : [], selectable_card_limit: { player: 0, center: 1 } },
      uniqueInformations: { werewolves, dreamwolf },
    })
  }