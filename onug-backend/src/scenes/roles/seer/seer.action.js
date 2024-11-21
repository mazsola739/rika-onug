import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction, getSelectableOtherPlayerNumbersWithNoShield } from '../../sceneUtils'

export const seerInteraction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(gamestate.players, token)

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS],
    selectable_card_limit: { player: 1, center: 2 }
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_one_any_other', 'conjunction_or', 'action_seer_end'],
    selectableCards: {
      selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS],
      selectable_card_limit: { player: 1, center: 2 }
    }
  })
}
