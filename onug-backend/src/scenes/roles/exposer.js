import { centerCardPositions, copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getSceneEndTime, getCardIdsByPositions, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

const randomExposerInstructions = [
  'exposer_flip1_text',
  'exposer_flip2_text',
  'exposer_flip3_text',
]



export const exposer = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
 //todo better narration
  const actionTime = 8

  const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
  const narration = [`${prefix}_kickoff_text`, randomExposerInstruction]

  newGameState.exposer = {
    instruction: '',
  }
  newGameState.exposer.instruction = randomExposerInstruction

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'exposer') {
      if (card.player_original_id === 46 || (card.player_role_id === 46 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = exposer_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_exposer') {
      if (card.player_role_id === 46 && card.player_original_id === 1) {
        interaction = exposer_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const exposer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const randomExposerInstruction = newGameState.exposer.instruction
  const limit = randomExposerInstruction.replace('exposer_flip', '').replace('_text', '')

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: limit },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [limit === 3 ? 'interaction_must_three_center' : limit === 2 ? 'interaction_must_two_center' : 'interaction_must_one_center'],
    icon: 'idcard',
    selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: limit } },
  })
}

export const exposer_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history, title)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  const cardPositions = selected_card_positions.slice(0, gameState.players[token].player_history[title].selectable_card_limit.center)
  const revealedCards = getCardIdsByPositions(newGameState.card_positions, cardPositions)

  newGameState.flipped.push(...revealedCards)

  if (revealedCards.some((card) => newGameState.players[token].card.player_original_id === card.id)) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    viewed_cards: cardPositions,
    flipped_cards: revealedCards,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_flipped_card', formatPlayerIdentifier(cardPositions)],
    icon: 'idcard',
    showCards: revealedCards,
    uniqueInformations: { idcard: cardPositions },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
