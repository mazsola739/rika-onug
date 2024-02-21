const createRevealer = (prefix) => () =>
  [`${prefix}_kickoff_text`, "revealer_kickoff2_text"]

export const revealer = (gameState) => createRevealer("revealer")
export const doppelganger_revealer = (gameState) => createRevealer("doppelganger_revealer")

import {
  getPlayerNumbersWithNonMatchingTokens,
  getCardIdsByPositions,
  getSelectablePlayersWithNoShield,
} from '../utils'

import { townIds } from '../constants'
import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { isValidSelection } from '../validate-response-data'


/* if (conditions.hasRevealerPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [24])
  return roles.revealer_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
}
if (conditions.hasDoppelgangerPlayer(newGameState.players) && conditions.hasRevealerPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [1])
  return roles.revealer_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */
//? INFO: Revealer - Turns and keeps one player's card face up unless they are not on the Villager Team
export const revealer_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])
    const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_may_one_any_other'],
        'id',
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

//TODO better response message
export const revealer_response =  (gameState, token, selected_positions, title) => {
  if (!isValidSelection(selected_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }

  const selectedPositionCard = newGameState.card_positions[selected_positions[0]]
  const revealedCard = getCardIdsByPositions(newGameState.card_positions, [selected_positions[0]])
  const isTown = revealedCard.every(card => townIds.includes(Object.values(card)[0]))

  if (newGameState.players[token].card?.original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  const scene_role_interactions = [
    generateSceneRoleInteractions(
      newGameState,
      title,
      token,
      ["interaction_saw_card", selected_positions[0]],
      'id',
      null,
      revealedCard,
      null,
      null,
      { flipped_cards: [selected_positions[0]] }
    )
  ]

  if (isTown) {
    newGameState.flipped.push(revealedCard[0])
    newGameState.players[token].player_history.flipped_cards = revealedCard
  } else {
    newGameState.players[token].player_history.show_cards = revealedCard
  }

  return { ...newGameState, scene_role_interactions }
}
