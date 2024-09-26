import { centerCardPositions, copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getSceneEndTime, getAnyEvenOrOddPlayers, getPlayerNeighborsByToken, getAnyOtherPlayersByToken, getNonAlienPlayerNumbersByRoleIdsWithNoShield, getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers, formatPlayerIdentifier } from '../../utils'
import { isValidCardSelection } from '../validate-response-data'
import { generateRoleInteraction } from './../generate-scene-role-interactions'

const randomBodysnatcherInstructions = [
  'bodysnatcher_steal_text',
  'bodysnatcher_center_text',
]
const bodysnatcherKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
]

export const bodysnatcher = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
 //todo better narration
  const actionTime = 8

  const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
  const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
  const narration = [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']

/*   newGameState.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGameState.bodysnatcher.instruction = randomAlienInstruction
  newGameState.bodysnatcher.key = alienKey */

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'bodysnatcher') {
      if (card.player_original_id === 74 || (card.player_role_id === 74 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = bodysnatcher_interaction(newGameState, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    } else if (prefix === 'doppelganger_bodysnatcher') {
      if (card.player_role_id === 74 && card.player_original_id === 1) {
        interaction = bodysnatcher_interaction(newGameState, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const bodysnatcher_interaction = (gameState, token, title, randomBodysnatcherInstruction, bodysnatcherKey) => {
  const newGameState = { ...gameState }

  if (newGameState.players[token].shield) {
    newGameState.players[token].player_history[title] = {
      ...newGameState.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_shielded'],
      icon: 'shielded',
    })
  }

  let selectablePlayers
  let selectableCards
  let interactionMessage

  if (randomBodysnatcherInstruction === 'bodysnatcher_steal_text') {
    switch (bodysnatcherKey) {
      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text':
        const evenOrOdd = bodysnatcherKey.replace('identifier_', '').replace('_text', '').replace('any', '')
        selectablePlayers = getAnyEvenOrOddPlayers(newGameState.players, evenOrOdd)
        break
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text':
      case 'identifier_oneneighbor_text':
        const direction = bodysnatcherKey.includes('left') ? 'left' : bodysnatcherKey.includes('right') ? 'right' : 'both'
        selectablePlayers = getPlayerNeighborsByToken(newGameState.players, direction, 1)
        break
      case 'identifier_any_text':
        selectablePlayers = getAnyOtherPlayersByToken(newGameState.players)
        break
    }

    const selectablePlayerNumbers = getNonAlienPlayerNumbersByRoleIdsWithNoShield(selectablePlayers)

    selectableCards = { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } }
    interactionMessage = selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_must_one_any_non_alien'
  } else if (randomBodysnatcherInstruction === 'bodysnatcher_center_text') {
    selectableCards = { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } }
    interactionMessage = 'interaction_must_one_center'
  }

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    ...selectableCards,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [interactionMessage],
    icon: 'alienhand',
    selectableCards,
  })
}

export const bodysnatcher_response = (gameState, token, selected_card_positions, title) => {
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
  newGameState.card_positions[currentPlayerNumber].card.team = "alien"
  newGameState.card_positions[currentPlayerNumber].card.role = "ALIEN"

  newGameState.players[token].card.player_card_id = newGameState.card_positions[currentPlayerNumber].card.id
  newGameState.players[token].card.player_team = newGameState.card_positions[currentPlayerNumber].card.team
  newGameState.players[token].card.player_role = newGameState.card_positions[currentPlayerNumber].card.role

  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, [currentPlayerNumber])

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    viewed_cards: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers, 'interaction_own_card'],
    icon: 'alienhand',
    showCards,
    uniqueInformations: { swap: [currentPlayerNumber, selected_card_positions[0]], alienhand: [currentPlayerNumber] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
