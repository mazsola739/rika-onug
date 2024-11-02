import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const werewolvesResponse = (gamestate, token, selected_card_positions, title) => {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }
    
    const newGamestate = { ...gamestate }

    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card
  
    if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      newGamestate.players[token].card.player_card_id = 0
    }
  
    newGamestate.players[token].card_or_mark_action = true
  
    const private_message = ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]]

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: [selected_card_positions[0]],
      private_message,
      obligatory: true
    }
  
    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message,
      showCards,
      obligatory: true,
      scene_end: true,
    })

    const narration = getNarrationByTitle(title, newGamestate.narration)

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  
    return newGamestate
  }
  