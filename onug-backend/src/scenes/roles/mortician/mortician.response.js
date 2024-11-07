import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

//TODO neighbors
export const morticianResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const cardPositions = selected_card_positions.slice(0, gamestate.players[token].player_history[title].selectable_card_limit.player)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const viewCards = getCardIdsByPositions(newGamestate.card_positions, cardPositions)

  const shouldResetPlayerCardId = () => {
    if (viewCards.some(card => newGamestate.players[token].card.player_original_id === card.id)) {
      return true
    }
    if (cardPositions.length === 1 && currentPlayerNumber === cardPositions[0] && viewCards[0].card.id === newGamestate.players[token].card.player_original_id) {
      return false
    }
    return true
  }

  if (shouldResetPlayerCardId()) {
    newGamestate.players[token].card.player_card_id = 87
  } else {
    newGamestate.players[token].card.player_card_id = newGamestate.card_positions[currentPlayerNumber].card.id
    newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_cards: cardPositions
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(cardPositions)],
    showCards: viewCards
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
