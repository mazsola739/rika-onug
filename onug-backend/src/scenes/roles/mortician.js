//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getPlayerNeighborsByToken, getSelectablePlayersWithNoShield, getPlayerNumberWithMatchingToken, getCardIdsByPositions, formatPlayerIdentifier, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

const randomMorticianInstructions = ['mortician_1card_text', 'mortician_2cards_text']
const morticianKeys = [
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_oneneighbor_text',
  'identifier_yourself_text',
]

export const mortician = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [`${prefix}_kickoff_text`]
  const actionTime = 10
//TODO
  const randomMorticianInstruction = getRandomItemFromArray(randomMorticianInstructions)
  const morticianKey = randomMorticianInstruction === 'mortician_2cards_text' ? 'identifier_bothneighbors_text' : getRandomItemFromArray(morticianKeys)
 // narration.push(randomMorticianInstruction, morticianKey)


    /*   newGameState.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGameState.bodysnatcher.instruction = randomAlienInstruction
  newGameState.bodysnatcher.key = alienKey */

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'mortician') {
      if (card.player_original_id === 49 || (card.player_role_id === 49 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = mortician_interaction(newGameState, token, title, randomMorticianInstruction, morticianKey)
      }
    } else if (prefix === 'doppelganger_mortician') {
      if (card.player_role_id === 49 && card.player_original_id === 1) {
        interaction = mortician_interaction(newGameState, token, title, randomMorticianInstruction, morticianKey)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const mortician_interaction = (gameState, token, title, randomMorticianInstruction, morticianKey) => {
  const newGameState = { ...gameState }

  if (morticianKey === 'identifier_yourself_text') {
    if (!newGameState.players[token].shield) {
      const currentPlayerNumber = getPlayerNumberWithMatchingToken(gameState.players, token)

      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        scene_title: title,
        selectable_cards: [currentPlayerNumber], selectable_card_limit: { player: 1, center: 0 },
      }

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_may_look_yourself'],
        icon: 'mortician',
        selectableCards: { selectable_cards: [currentPlayerNumber], selectable_card_limit: { player: 1, center: 0 } },
      })
    } else {
      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        scene_title: title,
        shielded: true,
      }

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_shielded'],
        icon: 'shielded',
      })
    }
  } else if (morticianKey.includes('neighbor')) {
    const direction = morticianKey.includes('left') ? 'left' : morticianKey.includes('right') ? 'right' : 'both'
    const selectablePlayers = getPlayerNeighborsByToken(newGameState.players, direction, 1)
    const selectablePlayerNumbers = getSelectablePlayersWithNoShield(selectablePlayers)
    const limit = randomMorticianInstruction.includes('1') ? 1 : 2

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 },
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : `interaction_may_${morticianKey.replace('identifier_', '').replace('_text', '')}`],
      icon: 'mortician',
      selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: limit, center: 0 }, }
    })
  }
}

export const mortician_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const cardPositions = selected_card_positions.slice(0, gameState.players[token].player_history.selectable_card_limit.player)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const viewCards = getCardIdsByPositions(newGameState.card_positions, cardPositions)

  const shouldResetPlayerCardId = () => {
    if (viewCards.some((card) => newGameState.players[token].card.player_original_id === card.id)) {
      return true
    }
    if (cardPositions.length === 1 && currentPlayerNumber === cardPositions[0] && viewCards[0].card.id === newGameState.players[token].card.player_original_id) {
      return false
    }
    return true
  }

  if (shouldResetPlayerCardId()) {
    newGameState.players[token].card.player_card_id = 0
  } else {
    newGameState.players[token].card.player_card_id = newGameState.card_positions[currentPlayerNumber].card.id
    newGameState.players[token].card.player_team = newGameState.card_positions[currentPlayerNumber].card.team
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    viewed_cards: cardPositions,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_saw_card', formatPlayerIdentifier(cardPositions)],
    icon: 'mortician',
    showCards: viewCards,
    uniqueInformations: { mortician: cardPositions },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
