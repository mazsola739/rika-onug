//@ts-check
import { SCENE, centerCardPositions } from '../../constant'
import { getAllPlayerTokens, getCardIdsByPositions } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const apprenticeseer = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['apprenticeseer_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 18 || (newGameState.players[token].card.player_role_id === 18 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 18 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = apprenticeseer_interaction(newGameState, token, title)
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

export const apprenticeseer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: centerCardPositions,
    selectable_card_limit: { player: 0, center: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_center'],
    icon: 'spy',
    selectableCards: {
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 0, center: 1 },
    },
  })
}

export const apprenticeseer_response = (gameState, token, selected_card_positions, title) => {
    if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  const newGameState = { ...gameState }
  const scene = []

  const viewCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
  const selectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card

  if (newGameState.players[token].card.player_original_id === selectedPositionCard.id) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: [selected_card_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', selected_card_positions[0]],
    icon: 'spy',
    showCards: viewCards,
    uniqInformations: { viewed_cards: [selected_card_positions[0]] },
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
