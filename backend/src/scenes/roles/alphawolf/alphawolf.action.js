import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { alphawolfResponse } from './alphawolf.response'

export const alphawolfAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'nonWerewolfWithoutShield', gamestate.positions.shielded_cards)
  const selectable_card_limit = { player: 1, center: 0 }
  const scene_end = selectable_cards.length === 0

  if (selectable_cards.length === 1) {
    gamestate.players[token].player_history[title].selectable_cards = selectable_cards
    alphawolfResponse(gamestate, token, selectable_cards, title)
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: [scene_end ? 'action_no_selectable_player' : 'action_must_one_any_non_werewolf'],
      selectableCards: { selectable_cards, selectable_card_limit },
      obligatory: !scene_end,
      scene_end
    })
  }
}
