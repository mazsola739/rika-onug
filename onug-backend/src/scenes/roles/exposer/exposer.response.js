import { SCENE } from "../../../constants"
import { getCardIdsByPositions, generateRoleInteraction, formatPlayerIdentifier } from "../../sceneUtils"
import { validateCardSelection } from "../../validators"

export const exposerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  const cardPositions = selected_card_positions.slice(0, gamestate.players[token].player_history[title].selectable_card_limit.center)
  const revealedCards = getCardIdsByPositions(newGamestate.card_positions, cardPositions)

  newGamestate.flipped.push(...revealedCards)

  if (revealedCards.some((card) => newGamestate.players[token].card.player_original_id === card.id)) {
    newGamestate.players[token].card.player_card_id = 0
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: cardPositions,
    flipped_cards: revealedCards,
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_flipped_card', formatPlayerIdentifier(cardPositions)],
    icon: 'idcard',
    showCards: revealedCards,
    uniqueInformations: { idcard: cardPositions },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
