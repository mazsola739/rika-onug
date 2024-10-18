import { CENTER_CARD_POSITIONS } from "../../../constants"
import { generateRoleInteraction } from "../../sceneUtils"

export const drunkInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  if (!newGamestate.players[token].shield) {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 },
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_must_one_center'],
      icon: 'drunk',
      selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 0, center: 1 } },
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_shielded'],
      icon: 'shielded',
    })
  }
}
