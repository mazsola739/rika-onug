import { GOOD_GUY } from "../../../constants"
import { getCardIdsByPositions, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage } from "../../sceneUtils"
import { validateCardSelection } from "../../validators"

//TODO better response message
export const revealerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const selectedPositionCard = gamestate.card_positions[selected_card_positions[0]].card
  const revealedCard = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])
  const isTown = revealedCard.every(card => GOOD_GUY.includes(Object.values(card)[0]))

  if (gamestate.players[token].card?.player_original_id === selectedPositionCard.id) {
    gamestate.players[token].card.player_card_id = 87
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    scene_end: true
  }

  if (!isTown) {
    gamestate.flipped_cards.push(revealedCard[0])
    gamestate.players[token].player_history[title].flipped_cards = revealedCard
  } else {
    gamestate.players[token].player_history[title].show_cards = revealedCard
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_flipped_card', formatPlayerIdentifier(selected_card_positions)[0]],
    showCards: revealedCard,
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
