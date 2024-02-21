export const troublemaker = (gameState) => ["troublemaker_kickoff_text"]

import { updatePlayerCard } from '../update-player-card'
import { generateSceneRoleInteractions } from '../generate-role-interactions'
import { isValidSelection } from '../validate-response-data'
import { getPlayerNumbersWithNonMatchingTokens, getSelectablePlayersWithNoShield } from '../utils'

/* if (conditions.hasTroublemakerPlayer) {
  tokens = getTokensByOriginalIds(newGameState.players, [11])
  return roles.troublemaker_interaction(newGameState, tokens, sceneTitle)
} */

//? INFO: Troublemaker - Swaps any two other player's cards (not her own or center) without looking at them
export const troublemaker_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach(token => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    updatePlayerCard(newGameState, token)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_two_any_other'],
        'swap',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 2, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
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

  newGameState.players[token].player_history.swapped_cards = [position1, position2]
  newGameState.players[token].card_or_mark_action = true

  const scene_role_interactions = [
    generateSceneRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", position1, position2],
      'claw',
      null,
      null,
      null,
      null,
      { swapped_cards: [position1, position2] }
    )
  ]

  return { ...newGameState, scene_role_interactions }
}