import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const drunkAction = (gamestate, token, title) => {
  if (!gamestate.players[token].shield) {
    //TODO SAME AS COPYCAT
    const selectable_cards = CENTER_CARD_POSITIONS
    const selectable_card_limit = { player: 0, center: 1 }

    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_must_one_center'],
      selectableCards: { selectable_cards, selectable_card_limit },
      obligatory: true
    })
  } else {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_shielded'],
      scene_end: true
    })
  }
}
