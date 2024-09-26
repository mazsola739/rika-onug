import { copyPlayerIds, SCENE, centerCardPositions } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const drunk = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['drunk_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 2 || (card.player_role_id === 2 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = drunk_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const drunk_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  if (!newGameState.players[token].shield) {
    newGameState.players[token].player_history[title] = {
      ...newGameState.players[token].player_history[title],
      selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 },
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_must_one_center'],
      icon: 'drunk',
      selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } },
    })
  } else {
    newGameState.players[token].player_history[title] = {
      ...newGameState.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_shielded'],
      icon: 'shielded',
    })
  }
}

export const drunk_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history, title)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerCard = { ...newGameState.card_positions[currentPlayerNumber].card }
  const selectedCard = { ...newGameState.card_positions[selected_card_positions[0]].card }
  newGameState.card_positions[currentPlayerNumber].card = selectedCard
  newGameState.card_positions[selected_card_positions[0]].card = currentPlayerCard

  newGameState.players[token].card.player_card_id = 0
  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], currentPlayerNumber])

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    icon: 'drunk',
    uniqueInformations: { drunk: [currentPlayerNumber, selected_card_positions[0]], },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
