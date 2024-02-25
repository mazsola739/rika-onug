//@ts-check
import { SCENE, centerCardPositions } from '../../constant'
import {
  getAllPlayerTokens,
  getPlayerNumbersWithMatchingTokens,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const drunk = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['drunk_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 2) {
      interaction = drunk_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const drunk_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  if (!newGameState.players[token].shield) {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 0, center: 1 },
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_must_one_center'],
      icon: 'drunk',
      selectableCards: {
        selectable_cards: centerCardPositions,
        selectable_card_limit: { player: 0, center: 1 },
      },
    })
  } else {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
    scene_title: title,
      shielded: true,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_shielded'],
      icon: 'shield',
      uniqInformations: { shielded: true },
    })
  }
}

export const drunk_response = (gameState, token, selected_card_positions, title) => {
  if (
    !isValidCardSelection(
      selected_card_positions,
      gameState.players[token].player_history
    )
  ) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const drunkPlayerNumber = getPlayerNumbersWithMatchingTokens(
    newGameState.players,
    [token]
  )[0]
  const drunkCard = { ...newGameState.card_positions[drunkPlayerNumber] }
  const selectedCard = { ...newGameState.card_positions[selected_card_positions[0]] }
  newGameState.card_positions[drunkPlayerNumber] = selectedCard
  newGameState.card_positions[selected_card_positions[0]] = drunkCard

  newGameState.players[token].card.player_card_id = 0
  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_cards: [
      `player_${newGameState.players[token].player_number}`,
      selected_card_positions[0],
    ],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: [
      'interaction_swapped_cards',
      selected_card_positions[0],
      `player_${newGameState.players[token].player_number}`,
    ],
    icon: 'drunk',
    uniqInformations: {
      swapped_cards: [
        `player_${newGameState.players[token].player_number}`,
        selected_card_positions[0],
      ],
    },
  })

  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
