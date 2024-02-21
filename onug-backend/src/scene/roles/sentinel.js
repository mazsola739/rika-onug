export const sentinel = (gameState) => ["sentinel_kickoff_text"]

import { updatePlayerCard } from '../update-player-card'
import { generateSceneRoleInteractions } from '../generate-role-interactions'
import { isValidSelection } from '../validate-response-data'

import {
  getPlayerNumbersWithNonMatchingTokens,
  getSelectablePlayersWithNoShield,
  getPlayerTokenByPlayerNumber,
} from '../utils'

/* if (conditions.hasSentinelPlayer) { //!SHIELD & MARK_OF_FEAR
  tokens = getTokensByOriginalIds(newGameState.players, [25])
  return roles.sentinel_interaction(newGameState, tokens, sceneTitle)
}
 */
//? INFO: Sentinel - Place a Shield token on any other player's card that card (not mark) cannot be looked at or moved
//! MARK_OF_FEAR
export const sentinel_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    updatePlayerCard(newGameState, token)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_any_other'],
        'shield',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}

export const sentinel_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const shieldedPlayerToken = getPlayerTokenByPlayerNumber(newGameState.players, selected_positions[0])

  newGameState.shield.push(selected_positions[0])
  newGameState.players[shieldedPlayerToken].shield = true
  newGameState.players[token].player_history.new_shield_card = selected_positions[0]

  const scene_role_interactions = [
    generateSceneRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_placed_shield", selected_positions[0]],
      'shield',
      null,
      null,
      null,
      null,
      { new_shield_card: [selected_positions[0]] }
    )
  ]

  return { ...newGameState, scene_role_interactions }
}
