//@ts-check
import { centerCardPositions, copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getNonAlienPlayerNumbersByRoleIds, getAnyOtherPlayersByToken, getAnyEvenOrOddPlayers, getPlayerNeighborsByToken, formatPlayerIdentifier, getPlayerNumberWithMatchingToken, getCardIdsByPlayerNumbers } from '../../utils'
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

const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
const createBodysnatcher = prefix => [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']

export const bodysnatcher = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createBodysnatcher(prefix)

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

  newGameState.scene = scene
  return newGameState
}

export const bodysnatcher_interaction = (gameState, token, title, randomBodysnatcherInstruction, bodysnatcherKey) => {
  const newGameState = { ...gameState }

  if (newGameState.players[token].shield) {
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

    const selectablePlayerNumbers = getNonAlienPlayerNumbersByRoleIds(selectablePlayers)

    selectableCards = { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } }
    interactionMessage = selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_one_any_non_alien'
  } else if (randomBodysnatcherInstruction === 'bodysnatcher_center_text') {
    selectableCards = { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } }
    interactionMessage = 'interaction_must_one_center'
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    ...selectableCards
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: [interactionMessage],
    icon: 'ufo',
    selectableCards,
  })
}

export const bodysnatcher_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
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

  newGameState.players[token].card.player_card_id = newGameState.card_positions[currentPlayerNumber].card.id
  newGameState.players[token].card.player_team = newGameState.card_positions[currentPlayerNumber].card.team

  const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, [currentPlayerNumber])

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    viewed_cards: [currentPlayerNumber],
  }

  const messageIdentifiers = formatPlayerIdentifier([currentPlayerNumber, selected_card_positions[0]])

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers, 'interaction_own_card'],
    icon: 'robber',
    showCards: showCards,
    uniqInformations: { swapped_cards: [currentPlayerNumber, selected_card_positions[0]], viewed_cards: [currentPlayerNumber] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
