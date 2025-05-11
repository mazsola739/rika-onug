import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

//TODO SAME AS DRUNK without shield
export const copycatAction = (gamestate, token, title) => {
  const selectable_cards = CENTER_CARD_POSITIONS
  const selectable_card_limit = { player: 0, center: 1 }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_must_one_center'],
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory: true
  })
}
