import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleInteraction } from '../../sceneUtils'

export const apprenticeseerInteraction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: CENTER_CARD_POSITIONS,
    selectable_card_limit: { player: 0, center: 1 },
    obligatory: false
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_may_one_center'],
    selectableCards: {
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: 1 }
    },
    obligatory: false
  })
}
