import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleInteraction } from '../../sceneUtils'

export const drunkInteraction = (gamestate, token, title) => {
  if (!gamestate.players[token].shield) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: 1 },
      obligatory: true
    }

    return generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_must_one_center'],
      selectableCards: {
        selectable_cards: CENTER_CARD_POSITIONS,
        selectable_card_limit: { player: 0, center: 1 }
      },
      obligatory: true
    })
  } else {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      shielded: true,
      scene_end: true
    }

    return generateRoleInteraction(gamestate, token, {
      private_message: ['interaction_shielded'],
      scene_end: true
    })
  }
}
