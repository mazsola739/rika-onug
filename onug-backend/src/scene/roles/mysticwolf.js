import { getAllPlayerTokens } from "../utils"
import { isValidSelection } from '../validate-response-data'

export const mysticwolf = (gameState) => {
  const newGameState = { ...gameState }
  const narration = ["mysticwolf_kickoff_text"]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach(token => {
   newGameState.players[token].scene_role_interaction.narration = narration

   if (newGameState.players[token].card.player_original_id === 22) {
    newGameState.players[token].scene_role_interaction.interaction = robber_interaction(newGameState, token)
   }
  })

  return newGameState
}

export const mysticwolf_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const selectablePlayerNumbers = getSelectableOtherPlayersWithoutShield(newGameState.players, token)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 }
    }
    
    return generateRoleInteraction(
      newGameState,
      private_message = ['interaction_may_one_any_other'],
      icon = 'spy',
      selectableCards = { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
    )
}

export const mysticwolf_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]
  const viewCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])

  if (newGameState.players[token]?.card?.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
    viewed_cards: [selected_positions[0]]
  }

  return generateRoleInteraction(
    newGameState,
    private_message = ["interaction_saw_card", selected_positions[0]],
    icon = 'spy',
    showCards = viewCards,
    uniqInformations = { viewed_cards: [selected_positions[0]] }
  )
}
