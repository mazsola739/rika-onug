import { generateRoleAction } from '../../sceneUtils'
import { getNonVillainPlayerNumbersByRoleIdsWithNoShield } from './temptress.utils'

export const temptressInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getNonVillainPlayerNumbersByRoleIdsWithNoShield(gamestate.players)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectablePlayerNumbers,
    selectable_card_limit: { player: 1, center: 0 },
    scene_end: selectablePlayerNumbers.length === 0
  }

  return generateRoleAction(gamestate, token, {
    private_message: [selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_must_one_any_non_villain'],
    selectableCards: {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    },
    scene_end: selectablePlayerNumbers.length === 0
  })
}
