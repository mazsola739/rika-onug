import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { alphawolfResponse } from './alphawolf.response'

export const alphawolfAction = (gamestate, token, title) => {
  const selectablePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate.players, 'nonWerewolfWithoutShield', gamestate.positions.shielded_cards)

  const isSingleSelectable = selectablePlayerNumbers.length === 1

  if (isSingleSelectable) {
    alphawolfResponse(gamestate, token, selectablePlayerNumbers, title)
  } else if (selectablePlayerNumbers.length > 1) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
      obligatory: true,
      scene_end: selectablePlayerNumbers.length === 0
    }

    return generateRoleAction(gamestate, token, {
      private_message: [selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_must_one_any_non_werewolf'],
      selectableCards: {
        selectable_cards: selectablePlayerNumbers,
        selectable_card_limit: { player: 1, center: 0 }
      },
      obligatory: true,
      scene_end: selectablePlayerNumbers.length === 0
    })
  }
}
