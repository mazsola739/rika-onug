import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleInteraction } from '../../sceneUtils'

export const exposerInteraction = (gamestate, token, title) => {
  const randomExposerInstruction = gamestate.exposer.instruction
  const limit = randomExposerInstruction.replace('exposer_flip', '').replace('_text', '')

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: CENTER_CARD_POSITIONS,
    selectable_card_limit: { player: 0, center: limit }
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: [limit === 3 ? 'interaction_must_three_center' : limit === 2 ? 'interaction_must_two_center' : 'interaction_must_one_center'],
    selectableCards: {
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: limit }
    }
  })
}
