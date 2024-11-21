import { formatPlayerIdentifier, generateRoleAction, getCardIdsByPositions, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

//TODO neighbors
export const morticianResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const cardPositions = selected_card_positions.slice(0, gamestate.players[token].player_history[title].selectable_card_limit.player)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const viewCards = getCardIdsByPositions(gamestate.card_positions, cardPositions)

  const shouldResetPlayerCardId = () => {
    if (viewCards.some(card => gamestate.players[token].card.player_original_id === card.id)) {
      return true
    }
    if (cardPositions.length === 1 && currentPlayerNumber === cardPositions[0] && viewCards[0].card.id === gamestate.players[token].card.player_original_id) {
      return false
    }
    return true
  }

  if (shouldResetPlayerCardId()) {
    gamestate.players[token].card.player_card_id = 87
  } else {
    gamestate.players[token].card.player_card_id = gamestate.card_positions[currentPlayerNumber].card.id
    gamestate.players[token].card.player_team = gamestate.card_positions[currentPlayerNumber].card.team
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: cardPositions
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_saw_card', formatPlayerIdentifier(cardPositions)],
    showCards: viewCards
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
