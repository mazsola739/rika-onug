import { SCENE } from '../../../constants'
import { getCardIdsByPositions, generateRoleInteraction, formatPlayerIdentifier } from '../../sceneUtils'
import { validateCardSelection } from '../../validators'

export const doppelgangerResponse = (gamestate, token, selected_card_positions, title) => {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }
    
    const newGamestate = { ...gamestate }
    const scene = []
  
    newGamestate.players[token].card.player_role_id = newGamestate.card_positions[selected_card_positions[0]].card.id
      
    if (newGamestate.card_positions[selected_card_positions[0]].card.id === 30 || newGamestate.card_positions[selected_card_positions[0]].card.id === 64) {
      newGamestate.players[token].card.player_role = 'VILLAGER'
      newGamestate.players[token].card.player_team = 'villager'
    } else {
      newGamestate.players[token].card.player_role = newGamestate.card_positions[selected_card_positions[0]].card.role
      newGamestate.players[token].card.player_team = newGamestate.card_positions[selected_card_positions[0]].card.team
    }
  
    const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
  
      ; (newGamestate.players[token].player_history[title].show_cards = showCards), (newGamestate.players[token].new_role_id = newGamestate.players[token].card.player_role_id)
    newGamestate.players[token].card_or_mark_action = true
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      viewed_cards: [selected_card_positions[0]],
    }
  
    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_you_are_that_role', `${newGamestate.players[token]?.card.player_role}`],
      showCards,
    })
  
    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene
  
    return newGamestate
  }
  