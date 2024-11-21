import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const witchAction = (gamestate, token, title) => {
  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: CENTER_CARD_POSITIONS,
    selectable_card_limit: { player: 0, center: 1 }
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_one_center'],
    selectableCards: {
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: 1 }
    }
  })
}
