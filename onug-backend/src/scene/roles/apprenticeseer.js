export const apprenticeseer = (gameState) => ["apprenticeseer_kickoff_text"]

/* if (conditions.hasApprenticeSeerPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [18])
  return roles.apprenticeseer_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

import { getCardIdsByPositions } from '../utils'
import { centerCardPositions } from '../constants'
import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

//? INFO: Apprentice Seer - looks at one card from the center (not another players or her own)
export const apprenticeseer_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach(token => {
    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_center'],
        'spy',
        { selectable_cards: centerCardPositions, selectable_card_limit: { player: 1, center: 0 } },
        null,
        null,
        null,
        null
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 }
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}

export const apprenticeseer_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  const viewCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]

  if (newGameState.players[token].card.original_id === selectedPositionCard.id) {
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
      viewCards,
      null,
      null,
      { viewed_cards: [selected_positions[0]] }
    )
  ]

  return { ...newGameState, scene_role_interactions }
}
