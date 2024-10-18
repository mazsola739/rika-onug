import { SCENE } from "../../../constants"
import { generateRoleInteraction } from "../../generateRoleInteraction"
import { getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers, formatPlayerIdentifier } from "../../sceneUtils"
import { validateCardSelection } from "../../validators"

export const bodysnatcherResponse = (gamestate, token, selected_card_positions, title) => {
    if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
      return gamestate
    }
    
    const newGamestate = { ...gamestate }
    const scene = []
  
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
    const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }
    const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
    newGamestate.card_positions[currentPlayerNumber].card = selectedCard
    newGamestate.card_positions[selected_card_positions[0]].card = currentPlayerCard
    newGamestate.card_positions[currentPlayerNumber].card.team = "alien"
    newGamestate.card_positions[currentPlayerNumber].card.role = "ALIEN"
  
    newGamestate.players[token].card.player_card_id = newGamestate.card_positions[currentPlayerNumber].card.id
    newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team
    newGamestate.players[token].card.player_role = newGamestate.card_positions[currentPlayerNumber].card.role
  
    const showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, [currentPlayerNumber])
  
    newGamestate.players[token].card_or_mark_action = true
  
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
      viewed_cards: [currentPlayerNumber],
    }
  
    const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])
  
    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_swapped_cards', ...messageIdentifiers, 'interaction_own_card'],
      icon: 'alienhand',
      showCards,
      uniqueInformations: { swap: [currentPlayerNumber, selected_card_positions[0]], alienhand: [currentPlayerNumber] },
    })
  
    scene.push({ type: SCENE, title, token, interaction })
    newGamestate.scene = scene
  
    return newGamestate
  }
  