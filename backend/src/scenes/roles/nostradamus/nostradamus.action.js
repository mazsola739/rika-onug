import { generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'
import { nostradamusResponse } from './nostradamus.response'

export const nostradamusAction = (gamestate, token, title) => {
  const selectable_cards = getPlayerNumbersByGivenConditions(gamestate.players, 'allPlayersWithoutShield', gamestate.positions.shielded_cards, token)
  const selectable_card_limit = { player: 3, center: 0 }
  const scene_end = selectable_cards.length === 0

  if (selectable_cards.length === 3) {
    nostradamusResponse(gamestate, token, selectable_cards, title)
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: [selectable_cards.length < 3 ? 'action_no_selectable_player' : 'action_must_three_any'],
      selectableCards: { selectable_cards, selectable_card_limit },
      obligatory: !scene_end,
      scene_end
    })
  }
}
