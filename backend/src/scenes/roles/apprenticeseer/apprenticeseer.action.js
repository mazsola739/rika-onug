import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const apprenticeseerAction = (gamestate, token, title) => {
  const selectable_cards = CENTER_CARD_POSITIONS
  const selectable_card_limit = { player: 0, center: 1 }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards,
    selectable_card_limit,
  }

  return generateRoleAction(gamestate, token, {
    private_message: ['action_may_one_center'],
    selectableCards: { selectable_cards, selectable_card_limit },
  })
}
