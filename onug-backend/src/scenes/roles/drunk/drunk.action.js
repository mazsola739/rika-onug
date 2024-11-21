import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction } from '../../sceneUtils'

export const drunkAction = (gamestate, token, title) => {
  if (!gamestate.players[token].shield) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: 1 },
      obligatory: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_must_one_center'],
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

    return generateRoleAction(gamestate, token, {
      private_message: ['action_shielded'],
      scene_end: true
    })
  }
}
