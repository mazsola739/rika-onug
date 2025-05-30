import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const exposerAction = (gamestate, token, title, prefix) => {
  const randomExposerInstruction = gamestate.roles[prefix].instruction
  const limit = +randomExposerInstruction.replace('exposer_flip', '')

  const selectable_cards = CENTER_CARD_POSITIONS
  const selectable_card_limit = { player: 0, center: limit }

  return generateRoleAction(gamestate, token, title, {
    private_message: [limit === 3 ? 'action_must_three_center' : limit === 2 ? 'action_must_two_center' : 'action_must_one_center'],
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory: true
  })
}
