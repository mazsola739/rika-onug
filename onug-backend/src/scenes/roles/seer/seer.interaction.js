import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleInteraction, getSelectableOtherPlayerNumbersWithNoShield } from '../../sceneUtils'

export const seerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const selectablePlayerNumbers = getSelectableOtherPlayerNumbersWithNoShield(newGamestate.players, token)

    //TODO const isSingleSelectable = selectablePlayerNumbers.length === 1

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS],
    selectable_card_limit: { player: 1, center: 2 }
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_any_other', 'conjunction_or', 'interaction_seer_end'],
    selectableCards: {
      selectable_cards: [...selectablePlayerNumbers, ...CENTER_CARD_POSITIONS],
      selectable_card_limit: { player: 1, center: 2 }
    }
  })
}
