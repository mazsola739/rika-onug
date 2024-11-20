import { generateRoleInteraction } from '../../sceneUtils'
import { getNonVillainPlayerNumbersByRoleIdsWithNoShield } from './temptress.utils'

export const temptressInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getNonVillainPlayerNumbersByRoleIdsWithNoShield(gamestate.players)

  //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_must_one_any_non_villain'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
