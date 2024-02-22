import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'
import { getSelectableOtherPlayersWithoutShield } from '../utils'

export const troublemaker = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["troublemaker_kickoff_text"] 
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 11) {
    newGameState.players[token].scene_role_interaction.interaction = troublemaker_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const troublemaker_interaction = (gameState, token) => {
  const newGameState = { ...gameState }
  
  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 2, center: 0 }
  }
  
  return generateRoleInteraction(
    newGameState,
    private_message = ['interaction_may_two_any_other'],
    icon = 'swap',
    selectableCards = { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 2, center: 0 } },
  )
}

export const troublemaker_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }

  const [position1, position2] = selected_positions
  const playerOneCard = { ...newGameState.card_positions[position1] }
  const playerTwoCard = { ...newGameState.card_positions[position2] }

  newGameState.card_positions[position1] = playerTwoCard
  newGameState.card_positions[position2] = playerOneCard

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
    swapped_cards: [position1, position2]
  }

  return generateRoleInteraction(
    newGameState,
    private_message = ["interaction_swapped_cards", position1, position2],
    icon = 'swap',
    uniqInformations = { swapped_cards: [position1, position2] }
  )
}