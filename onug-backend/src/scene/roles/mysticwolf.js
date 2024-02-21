export const mysticwolf = (gameState) => ["mysticwolf_kickoff_text"]

/* if (conditions.hasMysticWolfPlayer) {
  tokens = getTokensByOriginalIds(newGameState.players, [22])
  return roles.mysticwolf_interaction(newGameState, tokens, sceneTitle)
}
 */
import { updatePlayerCard } from '../update-player-card'
import { generateSceneRoleInteractions } from '../generate-role-interactions'
import { isValidSelection } from '../validate-response-data'

import {
  getCardIdsByPositions,
  getPlayerNumbersWithNonMatchingTokens,
  getSelectablePlayersWithNoShield,
} from '../utils'

//? INFO: Mystic Wolf - Wakes with other Werewolves. Wakes after and looks at any other player's card (not center or own)
export const mysticwolf_interaction = (gameState, tokens, title) => {
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
        'spy',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null,
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

  newGameState.players[token].player_history.show_cards = viewCards
  newGameState.players[token].card_or_mark_action = true

  const scene_role_interactions = [
    generateSceneRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_saw_card", selected_positions[0]],
      'spy',
      null,
      null,
      viewCards,
      null,
      { viewed_cards: [selected_positions[0]] }
    )
  ]

  newGameState.scene_role_interactions = scene_role_interactions

  return newGameState
}
