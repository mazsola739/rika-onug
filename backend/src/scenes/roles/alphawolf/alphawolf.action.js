import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { alphawolfResponse } from './alphawolf.response'

export const alphawolfAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate.players, 'nonWerewolfWithoutShield', gamestate.positions.shielded_cards)

  const isSingleSelectable = selectablePlayerNumbers.length === 1
  const obligatory = !isSingleSelectable
  const scene_end = selectablePlayerNumbers.length !== 1

  const selectable_cards = selectablePlayerNumbers
  const selectable_card_limit = { player: 1, center: 0 }

  if (isSingleSelectable) {
    alphawolfResponse(gamestate, token, selectablePlayerNumbers, title)
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: [selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_must_one_any_non_werewolf'],
      selectableCards: { selectable_cards, selectable_card_limit },
      obligatory,
      scene_end
    })
  }
}
