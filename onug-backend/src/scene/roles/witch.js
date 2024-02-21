export const witch = (gameState) => ["witch_kickoff_text"] 

import { centerCardPositions } from '../constants'
import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

import {
  getPlayerNumbersWithMatchingTokens,
  getSelectablePlayersWithNoShield,
  getAllPlayerTokens,
  getCardIdsByPositions,
} from '../utils'

/* if (conditions.hasWitchPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [27])
  return roles.witch_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

//? INFO: Witch - May look at one center card. If she does she must swap it with any player's card (including hers)
export const witch_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach(token => {
    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_center'],
        'voodoo',
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

export const witch_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  if (selected_positions[0].includes("center_")) {
    const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
    const selectedCenterCardPosition = newGameState.card_positions[selected_positions[0]]

    if (newGameState.players[token].card.original_id === selectedCenterCardPosition.id) {
      newGameState.players[token].card.player_card_id = 0
    }

    const allPlayerTokens = getAllPlayerTokens(newGameState.players)
    const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    const scene_role_interactions = [
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_saw_card", selected_positions[0], "interaction_must_one_any"],
        'voodoo',
        { selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 } },
        null,
        showCards,
        null,
        { viewed_cards: [selected_positions[0]] }
      )
    ]

    newGameState.players[token].player_history.selectable_cards = selectablePlayersWithNoShield
    newGameState.players[token].player_history.selectable_card_limit = { player: 1, center: 0 }
    newGameState.players[token].player_history.selected_center_card = selected_positions[0]
    newGameState.players[token].player_history.show_cards = showCards

    return { ...newGameState, scene_role_interactions }
  } else if (selected_positions[0].includes("player_")) {
    const selectedCenterPositionCard = newGameState.card_positions[newGameState.players[token].player_history.selected_center_card]
    const selectedPlayerPositionCard = newGameState.card_positions[selected_positions[0]]

    const selectedCenterCard = { ...selectedCenterPositionCard }
    const selectedPlayerCard = { ...selectedPlayerPositionCard }
    newGameState.card_positions[newGameState.players[token].player_history.selected_center_card] = selectedPlayerCard
    newGameState.card_positions[selected_positions[0]] = selectedCenterCard

    const witchPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

    if (selected_positions[0] === witchPlayerNumber[0]) {
      const currentCard = newGameState.card_positions[witchPlayerNumber[0]]
      newGameState.players[token].card.player_card_id = currentCard.id
      newGameState.players[token].card.player_team = currentCard.team
    }

    const scene_role_interactions = [
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ["interaction_saw_card", "interaction_swapped_cards", `${newGameState.players[token].player_history.selected_center_card}`, selected_positions[0]],
        'voodoo',
        null,
        null,
        null,
        null,
        { swapped_cards: [newGameState.players[token].player_history.selected_center_card, selected_positions[0]] }
      )
    ]

    newGameState.players[token].player_history.swapped_cards = [newGameState.players[token].player_history.selected_center_card, selected_positions[0]]

    return { ...newGameState, scene_role_interactions }
  }

  return newGameState
}