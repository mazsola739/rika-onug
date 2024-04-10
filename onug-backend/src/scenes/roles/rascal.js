//@ts-check
import { centerCardPositions, copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getSceneEndTime, getAnyEvenOrOddPlayers, getAnyHigherOrLowerPlayerNumbersByToken, getPlayerNeighborsByToken, getSelectablePlayersWithNoShield, getSelectableOtherPlayerNumbersWithNoShield, getPlayerNumberWithMatchingToken, formatPlayerIdentifier, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, getCardIdsByPlayerNumbers } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'
import { villageidiot_interaction } from './villageidiot'

const randomRascalInstructions = [
  'rascal_idiot_text',
  'rascal_troublemaker_text',
  'rascal_witch_text',
  'rascal_drunk_text',
  'rascal_robber_text',
]
const rascalAnyOneKeys = [
  'identifier_higher_text',
  'identifier_lower_text',
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_oneneighbor_text',
  'identifier_center_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
]
const rascalAnyTwoKeys = [
  'identifier_any2_text',
  'identifier_any2even_text',
  'identifier_any2odd_text',
  'identifier_any2higher_text',
  'identifier_any2lower_text',
  'identifier_2leftneighbors_text',
  'identifier_2rightneighbors_text',
  'identifier_bothneighbors_text'
]

export const rascal = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const randomRascalInstruction = getRandomItemFromArray(randomRascalInstructions)
  const rascalKey = randomRascalInstruction === 'rascal_troublemaker_text' ? getRandomItemFromArray(rascalAnyTwoKeys) : getRandomItemFromArray(rascalAnyOneKeys)
  const narration = [`${prefix}_kickoff_text`]
  let actionTime

  switch (randomRascalInstruction) {
    case 'rascal_troublemaker_text':
      actionTime = 12
      narration.push('rascal_troublemaker_text', rascalKey)
      break
    case 'rascal_witch_text':
      actionTime = 12
      narration.push('rascal_witch_text', rascalKey, 'rascal_witchend_text')
      break
    case 'rascal_drunk_text':
      actionTime = 12
      narration.push('rascal_drunk_text', rascalKey, 'rascal_drunkend_text')
      break
    case 'rascal_robber_text':
      actionTime = 12
      narration.push('rascal_robber_text', rascalKey, 'rascal_robberend_text')
      break
    case 'rascal_idiot_text':
      actionTime = 8
      narration.push('rascal_idiot_text')
      break
  }

  newGameState.rascal = {
    instruction: '',
    key: '',
  }
  newGameState.oracle.instruction = randomRascalInstruction
  newGameState.oracle.key = rascalKey

  tokens.forEach((token) => {
    let interaction = {}
    const card = newGameState.players[token].card

    if ((prefix === 'rascal' && (card.player_original_id === 52 || (card.player_role_id === 52 && copyPlayerIds.includes(card.player_original_id)))) ||
      (prefix === 'doppelganger_rascal' && card.player_role_id === 52 && card.player_original_id === 1)) {
      if (randomRascalInstruction === "rascal_idiot_text") {
        interaction = villageidiot_interaction(newGameState, token, title)
      } else {
        interaction = rascal_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const rascal_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  let privateMessage
  let limit = 1 
  let selectableCards
  let selectableLimit
  const randomRascalInstruction = newGameState.oracle.instruction
  const rascalKey = newGameState.oracle.key

  const getSelectableTwoPlayers = (rascalKey) => {
    switch (rascalKey) {
      case 'identifier_any2_text':
        return getAllPlayerTokens(newGameState.players)

      case 'identifier_any2even_text':
      case 'identifier_any2odd_text':
        const evenOrOddTwo = rascalKey.replace('identifier_any2', '').replace('_text', '')
        return getAnyEvenOrOddPlayers(newGameState.players, evenOrOddTwo)

      case 'identifier_any2higher_text':
      case 'identifier_any2lower_text':
        const higherOrLowerTwo = rascalKey.replace('identifier_any2', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(newGameState.players, higherOrLowerTwo)

      case 'identifier_2leftneighbors_text':
      case 'identifier_2rightneighbors_text':
      case 'identifier_bothneighbors_text':
        const directionTwo = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        const amountTwo = rascalKey.includes('2') ? 2 : 1
        return getPlayerNeighborsByToken(newGameState.players, directionTwo, amountTwo)
    }
  }

  const getSelectableOnePlayers = (rascalKey) => {
    switch (rascalKey) {
      case 'identifier_higher_text':
      case 'identifier_lower_text':
        const higherOrLowerOne = rascalKey.replace('identifier_', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(newGameState.players, higherOrLowerOne)

      case 'identifier_any_text':
        return getAllPlayerTokens(newGameState.players)

      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text':
        const evenOrOddOne = rascalKey.replace('identifier_any', '').replace('_text', '')
        return getAnyEvenOrOddPlayers(newGameState.players, evenOrOddOne)

      case 'identifier_oneneighbor_text':
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text':
        const directionOne = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        return getPlayerNeighborsByToken(newGameState.players, directionOne, 1)
    }
  }
  //todo better solution to get selectable players
  const selectableTwoPlayers = getSelectableTwoPlayers(rascalKey)
  const selectableOnePlayers = getSelectableOnePlayers(rascalKey)

  if (randomRascalInstruction === 'rascal_troublemaker_text') {
    selectableCards = getSelectablePlayersWithNoShield(selectableTwoPlayers) <= 2 ? [] : getSelectablePlayersWithNoShield(selectableTwoPlayers)
    limit = selectableCards.length >= 2 ? 2 : 0
    privateMessage = [selectableCards.length >= 2 ? 'interaction_may_two_any' : 'interaction_no_selectable_player']
  } else if (randomRascalInstruction === 'rascal_drunk_text' || randomRascalInstruction === 'rascal_robber_text') {
    if (newGameState.players[token].shield) {
      newGameState.players[token].player_history[title] = {
        ...newGameState.players[token].player_history[title],
        shielded: true,
      }

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_shielded'],
        icon: 'shielded',
      })
    } else {
      selectableCards = rascalKey === 'identifier_center_text' ? centerCardPositions : getSelectableOtherPlayerNumbersWithNoShield(selectableOnePlayers, token)
      privateMessage = [selectableCards.length === 0 ? 'interaction_no_selectable_player' : randomRascalInstruction === 'rascal_drunk_text' ? 'interaction_must_one_any_other' : 'interaction_may_one_any_other']
    }
  } else {
    selectableCards = rascalKey === 'identifier_center_text' ? centerCardPositions : getSelectablePlayersWithNoShield(selectableOnePlayers)
    privateMessage = [selectableCards.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other']
  }

  if (selectableCards === centerCardPositions) {
    selectableLimit = { player: 0, center: limit  }
  } else {
    selectableLimit = { player: limit , center: 0 }
  }

  const random = randomRascalInstruction.replace('rascal_', '').replace('_text', '')

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    selectable_cards: selectableCards, selectable_card_limit: selectableLimit,
    random,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: 'prank',
    selectableCards: { selectable_cards: selectableCards, selectable_card_limit: selectableLimit },
  })
}

export const rascal_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history, title)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerCard = { ...newGameState.card_positions[currentPlayerNumber].card }

  let interaction

  switch (newGameState.players[token].player_history.random) {
    case 'troublemaker':
      const [position1, position2] = selected_card_positions.slice(0, 2)

      const playerOneCard = { ...newGameState.card_positions[position1].card }
      const playerTwoCard = { ...newGameState.card_positions[position2].card }

      newGameState.card_positions[position1].card = playerTwoCard
      newGameState.card_positions[position2].card = playerOneCard

      newGameState.players[token].card_or_mark_action = true

      if (currentPlayerNumber === position1 || currentPlayerNumber === position2) {
        newGameState.players[token].card.player_card_id = 0
      }

      newGameState.players[token].player_history[title] = {
        ...newGameState.players[token].player_history[title],
        swapped_cards: [position1, position2],
      }

      const messageIdentifiers = formatPlayerIdentifier([position1, position2])

      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_swapped_cards', ...messageIdentifiers],
        icon: 'prank',
        uniqueInformations: { prank: [position1, position2] },
      })

      break

    case 'witch':
      if (!newGameState.players[token].player_history.witch_answer) {
        const showCards = getCardIdsByPositions(newGameState.card_positions, [selected_card_positions[0]])
        const selectedCardPosition = newGameState.card_positions[selected_card_positions[0]].card

        if (newGameState.players[token].card.player_original_id === selectedCardPosition.id) {
          newGameState.players[token].card.player_card_id = 0
        }

        const allPlayerTokens = getAllPlayerTokens(newGameState.players)
        const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)
        const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGameState.shield)

        newGameState.players[token].player_history[title] = {
          ...newGameState.players[token].player_history[title],
          selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
          viewed_cards: [selected_card_positions[0]], selected_card: selected_card_positions[0],
          witch_answer: true,
        }

        interaction = generateRoleInteraction(newGameState, token, {
          private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
          icon: 'prank',
          selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 1, center: 0 } },
          showCards,
          uniqueInformations: { prank: [selected_card_positions[0]], witch_answer: true },
        })

      } else if (newGameState.players[token].player_history.witch_answer) {
        const firstSelectedPositionCard = newGameState.card_positions[newGameState.players[token].player_history.selected_card].card
        const secondSelectedPositionCard = newGameState.card_positions[selected_card_positions[0]].card

        const selectedCenterCard = { ...firstSelectedPositionCard }
        const selectedPlayerCard = { ...secondSelectedPositionCard }
        newGameState.card_positions[newGameState.players[token].player_history.selected_card].card = selectedPlayerCard
        newGameState.card_positions[selected_card_positions[0]].card = selectedCenterCard

        if (selected_card_positions[0] === currentPlayerNumber[0]) {
          const currentCard = newGameState.card_positions[currentPlayerNumber[0]].card
          newGameState.players[token].card.player_card_id = currentCard.id
          newGameState.players[token].card.player_team = currentCard.team
        }

        newGameState.players[token].player_history[title] = {
          ...newGameState.players[token].player_history[title],
          swapped_cards: [newGameState.players[token].player_history.selected_card, selected_card_positions[0]],
        }

        const messageIdentifiers = formatPlayerIdentifier([`${newGameState.players[token].player_history.selected_card}`, selected_card_positions[0]])

        interaction = generateRoleInteraction(newGameState, token, {
          private_message: ['interaction_swapped_cards', ...messageIdentifiers],
          icon: 'prank',
          uniqueInformations: { prank: [newGameState.players[token].player_history.selected_card, selected_card_positions[0]] },
        })

      }
      break

    case 'drunk':
    case 'robber':
      const selectedPosition = selected_card_positions[0]
      const selectedCard = { ...newGameState.card_positions[selectedPosition].card }

      newGameState.card_positions[currentPlayerNumber].card = selectedCard
      newGameState.card_positions[selectedPosition].card = currentPlayerCard

      if (newGameState.players[token].player_history.random === 'drunk') {
        newGameState.players[token].card.player_card_id = 0
      } else {
        newGameState.players[token].card.player_card_id = newGameState.card_positions[currentPlayerNumber].card.id
        newGameState.players[token].card.player_team = newGameState.card_positions[currentPlayerNumber].card.team
      }

      const showCards = getCardIdsByPlayerNumbers(newGameState.card_positions, [currentPlayerNumber])

      newGameState.players[token].card_or_mark_action = true

      newGameState.players[token].player_history[title] = {
        ...newGameState.players[token].player_history[title],
        swapped_cards: [currentPlayerNumber, selectedPosition],
        viewed_cards: [currentPlayerNumber],
      }

      const messageIds = formatPlayerIdentifier([currentPlayerNumber, selectedPosition])

      interaction = generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_swapped_cards', ...messageIds, newGameState.players[token].player_history.random === 'robber' ? 'interaction_own_card' : ''],
        icon: 'prank',
        showCards: newGameState.players[token].player_history.random === 'robber' ? showCards : undefined,
        uniqueInformations: { prank: [currentPlayerNumber, selectedPosition] },
      })

      break
  }


  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}

