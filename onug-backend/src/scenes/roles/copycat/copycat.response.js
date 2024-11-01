import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const copycatResponse = (gamestate, token, selected_card_positions, title) => {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }
    
    const newGamestate = { ...gamestate }
  
    newGamestate.players[token].card.player_role_id = newGamestate.card_positions[selected_card_positions[0]].card.id
      
    if (newGamestate.card_positions[selected_card_positions[0]].card.id === 1 || newGamestate.card_positions[selected_card_positions[0]].card.id === 30 || newGamestate.card_positions[selected_card_positions[0]].card.id === 64) {
      newGamestate.players[token].card.player_role = 'VILLAGER'
      newGamestate.players[token].card.player_team = 'villager'
    } else {
      newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[0]].card.role
      newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[0]].card.team
    }
  
    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
  
    newGamestate.players[token].new_role_id = newGamestate.players[token].card.player_role_id
    newGamestate.players[token].card_or_mark_action = true
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: [selected_card_positions[0]],
    }
  
    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_you_are_that_role', `${newGamestate.players[token]?.card.player_role}`],
      showCards,
    })
    
    const narration = getNarrationByTitle(title, newGamestate.narration)

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  
    return newGamestate
  }
  