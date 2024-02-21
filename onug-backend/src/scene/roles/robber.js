export const robber = (gameState) => ["robber_kickoff_text"]

import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'

import {
  getPlayerNumbersWithNonMatchingTokens,
  getSelectablePlayersWithNoShield,
  getPlayerNumbersWithMatchingTokens,
  getCardIdsByPlayerNumbers,
} from '../utils'

/* if (conditions.hasRobberPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [8])
  return roles.robber_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */

//? INFO: Robber - Swaps his card for any other player’s card (not center) which he then looks at
export const robber_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    if (!newGameState.players[token].shield) {
      const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, token)
      const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

      scene_role_interactions.push(
        generateSceneRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_may_one_any_other'],
          'robber',
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

    } else {
      scene_role_interactions.push(
        generateSceneRoleInteractions(
          newGameState,
          title,
          token,
          ['interaction_shielded'],
          'shield',
          null,
          null,
          null,
          null,
          null
        )
      )

      const playerHistory = {
        ...newGameState.players[token].player_history,
        ...newGameState.actual_scene,
        shielded: true
      }
      newGameState.players[token].player_history = playerHistory
    }
  })

  return { ...newGameState, scene_role_interactions }
}

export const robber_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  const robberPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])[0]
  const robberCard = { ...newGameState.card_positions[robberPlayerNumber] }
  const selectedCard = { ...newGameState.card_positions[selected_positions[0]] }
  newGameState.card_positions[robberPlayerNumber] = selectedCard
  newGameState.card_positions[selected_positions[0]] = robberCard

  newGameState.players[token].card.player_card_id = newGameState.card_positions[robberPlayerNumber].id
  newGameState.players[token].card.player_team = newGameState.card_positions[robberPlayerNumber].team

  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, [robberPlayerNumber])

  newGameState.players[token].player_history.swapped_cards = [selected_positions[0], `player_${newGameState.players[token].player_number}`]
  newGameState.players[token].player_history.show_cards = showCards
  newGameState.players[token].card_or_mark_action = true

  const scene_role_interactions = [
    generateSceneRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_swapped_cards", "interaction_saw_card", `player_${newGameState.players[token].player_number}`],
      'robber',
      null,
      null,
      showCards,
      null,
      { swapped_cards: [`player_${newGameState.players[token].player_number}`, selected_positions[0]], viewed_cards: [`player_${newGameState.players[token].player_number}`] }
    )
  ]

  return { ...gameState, scene_role_interactions }
}