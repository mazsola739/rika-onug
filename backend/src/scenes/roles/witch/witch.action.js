import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const witchAction = (gamestate, token, title) => {
  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_may_one_center'],
    selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 } },
  })
}
