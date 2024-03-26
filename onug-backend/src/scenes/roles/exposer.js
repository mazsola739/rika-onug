//@ts-check
import { centerCardPositions, copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getCardIdsByPositions, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

const randomExposerInstructions = [
  'exposer_flip1_text',
  'exposer_flip2_text',
  'exposer_flip3_text',
]

const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
const createExposer = prefix => [`${prefix}_kickoff_text`, randomExposerInstruction]

export const exposer = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createExposer(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'exposer') {
      if (card.player_original_id === 46 || (card.player_role_id === 46 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = exposer_interaction(newGameState, token, title, randomExposerInstruction)
      }
    } else if (prefix === 'doppelganger_exposer') {
      if (card.player_role_id === 46 && card.player_original_id === 1) {
        interaction = exposer_interaction(newGameState, token, title, randomExposerInstruction)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const exposer_interaction = (gameState, token, title, randomExposerInstruction) => {
  const newGameState = { ...gameState }

  const limit = randomExposerInstruction.replace('exposer_flip', '').replace('_text', '')

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: limit },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_center'],
    icon: 'spy',
    selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: limit } },
  })
}

export const exposer_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  const cardPositions = selected_card_positions.slice(0, gameState.players[token].player_history.selectable_card_limit.center)
  const revealedCards = getCardIdsByPositions(newGameState.card_positions, cardPositions)

  newGameState.flipped.push(...revealedCards)

  if (revealedCards.some((card) => newGameState.players[token].card.player_original_id === card.id)) {
    newGameState.players[token].card.player_card_id = 0
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    viewed_cards: cardPositions,
    flipped_cards: revealedCards,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_flipped_card', formatPlayerIdentifier(cardPositions)],
    icon: 'id',
    showCards: revealedCards,
    uniqInformations: { flipped_cards: cardPositions },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
