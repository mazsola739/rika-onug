import { CENTER_CARD_POSITIONS, IDS, SCENE } from '../../../constants'
import { getRandomItemFromArray, getAllPlayerTokens, getSceneEndTime, getAnyEvenOrOddPlayers, getPlayerNeighborsByToken, getSelectablePlayersWithNoShield, getSelectableOtherPlayerNumbersWithNoShield, getPlayerNumberWithMatchingToken, formatPlayerIdentifier, getCardIdsByPositions, getPlayerNumbersWithMatchingTokens, getCardIdsByPlayerNumbers } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { validateCardSelection } from '../../validators'
import { villageidiotInteraction } from '..'

export const getAnyHigherOrLowerPlayerNumbersByToken = (players, token, higherOrLower) => {
  const playerNumber = players[token].player_number
  const result = {}

  if (higherOrLower === 'lower') {
      for (let i = playerNumber - 1; i >= 1; i--) {
          result[i] = players[Object.keys(players).find(key => players[key].player_number === i)]
      }
  } else if (higherOrLower === 'higher') {
      const totalPlayers = Object.keys(players).length
      for (let i = playerNumber + 1; i <= totalPlayers; i++) {
          result[i] = players[Object.keys(players).find(key => players[key].player_number === i)]
      }
  }

  return result
}

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

export const rascal = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
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

  newGamestate.rascal = {
    instruction: '',
    key: '',
  }
  newGamestate.oracle.instruction = randomRascalInstruction
  newGamestate.oracle.key = rascalKey

  tokens.forEach((token) => {
    let interaction = {}
    const card = newGamestate.players[token].card

    if ((prefix === 'rascal' && (card.player_original_id === 52 || (card.player_role_id === 52 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id)))) ||
      (prefix === 'doppelganger_rascal' && card.player_role_id === 52 && card.player_original_id === 1)) {
      if (randomRascalInstruction === "rascal_idiot_text") {
        interaction = villageidiotInteraction(newGamestate, token, title)
      } else {
        interaction = rascalInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const rascalInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  let privateMessage
  let limit = 1 
  let selectableCards
  let selectableLimit
  const randomRascalInstruction = newGamestate.oracle.instruction
  const rascalKey = newGamestate.oracle.key

  const getSelectableTwoPlayers = (rascalKey) => {
    switch (rascalKey) {
      case 'identifier_any2_text':
        return getAllPlayerTokens(newGamestate.players)

      case 'identifier_any2even_text':
      case 'identifier_any2odd_text':
        { const evenOrOddTwo = rascalKey.replace('identifier_any2', '').replace('_text', '')
        return getAnyEvenOrOddPlayers(newGamestate.players, evenOrOddTwo) }

      case 'identifier_any2higher_text':
      case 'identifier_any2lower_text':
        { const higherOrLowerTwo = rascalKey.replace('identifier_any2', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(newGamestate.players, higherOrLowerTwo) }

      case 'identifier_2leftneighbors_text':
      case 'identifier_2rightneighbors_text':
      case 'identifier_bothneighbors_text':
        { const directionTwo = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        const amountTwo = rascalKey.includes('2') ? 2 : 1
        return getPlayerNeighborsByToken(newGamestate.players, directionTwo, amountTwo) }
    }
  }

  const getSelectableOnePlayers = (rascalKey) => {
    switch (rascalKey) {
      case 'identifier_higher_text':
      case 'identifier_lower_text':
        { const higherOrLowerOne = rascalKey.replace('identifier_', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(newGamestate.players, higherOrLowerOne) }

      case 'identifier_any_text':
        return getAllPlayerTokens(newGamestate.players)

      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text':
        { const evenOrOddOne = rascalKey.replace('identifier_any', '').replace('_text', '')
        return getAnyEvenOrOddPlayers(newGamestate.players, evenOrOddOne) }

      case 'identifier_oneneighbor_text':
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text':
        { const directionOne = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        return getPlayerNeighborsByToken(newGamestate.players, directionOne, 1) }
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
    if (newGamestate.players[token].shield) {
      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        shielded: true,
      }

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_shielded'],
        icon: 'shielded',
      })
    } else {
      selectableCards = rascalKey === 'identifier_center_text' ? CENTER_CARD_POSITIONS : getSelectableOtherPlayerNumbersWithNoShield(selectableOnePlayers, token)
      privateMessage = [selectableCards.length === 0 ? 'interaction_no_selectable_player' : randomRascalInstruction === 'rascal_drunk_text' ? 'interaction_must_one_any_other' : 'interaction_may_one_any_other']
    }
  } else {
    selectableCards = rascalKey === 'identifier_center_text' ? CENTER_CARD_POSITIONS : getSelectablePlayersWithNoShield(selectableOnePlayers)
    privateMessage = [selectableCards.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other']
  }

  if (selectableCards === CENTER_CARD_POSITIONS) {
    selectableLimit = { player: 0, center: limit  }
  } else {
    selectableLimit = { player: limit , center: 0 }
  }

  const random = randomRascalInstruction.replace('rascal_', '').replace('_text', '')

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_cards: selectableCards, selectable_card_limit: selectableLimit,
    random,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    icon: 'prank',
    selectableCards: { selectable_cards: selectableCards, selectable_card_limit: selectableLimit },
  })
}

export const rascalResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerCard = { ...newGamestate.card_positions[currentPlayerNumber].card }

  let interaction

  switch (newGamestate.players[token].player_history[title].random) {
    case 'troublemaker':
      { const [position1, position2] = selected_card_positions.slice(0, 2)

      const playerOneCard = { ...newGamestate.card_positions[position1].card }
      const playerTwoCard = { ...newGamestate.card_positions[position2].card }

      newGamestate.card_positions[position1].card = playerTwoCard
      newGamestate.card_positions[position2].card = playerOneCard

      newGamestate.players[token].card_or_mark_action = true

      if (currentPlayerNumber === position1 || currentPlayerNumber === position2) {
        newGamestate.players[token].card.player_card_id = 0
      }

      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        swapped_cards: [position1, position2],
      }

      const messageIdentifiers = formatPlayerIdentifier([position1, position2])

      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_swapped_cards', ...messageIdentifiers],
        icon: 'prank',
        uniqueInformations: { prank: [position1, position2] },
      })

      break }

    case 'witch':
      if (!newGamestate.players[token].player_history[title].witch_answer) {
        const showCards = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
        const selectedCardPosition = newGamestate.card_positions[selected_card_positions[0]].card

        if (newGamestate.players[token].card.player_original_id === selectedCardPosition.id) {
          newGamestate.players[token].card.player_card_id = 0
        }

        const allPlayerTokens = getAllPlayerTokens(newGamestate.players)
        const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGamestate.players, allPlayerTokens)
        const selectablePlayersWithNoShield = getSelectablePlayersWithNoShield(selectablePlayerNumbers, newGamestate.shield)

        newGamestate.players[token].player_history[title] = {
          ...newGamestate.players[token].player_history[title],
          selectable_cards: selectablePlayersWithNoShield, selectable_card_limit: { player: 1, center: 0 },
          viewed_cards: [selected_card_positions[0]], selected_card: selected_card_positions[0],
          witch_answer: true,
        }

        interaction = generateRoleInteraction(newGamestate, token, {
          private_message: ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0], 'interaction_must_one_any'],
          icon: 'prank',
          selectableCards: { selectable_cards: CENTER_CARD_POSITIONS, selectable_card_limit: { player: 1, center: 0 } },
          showCards,
          uniqueInformations: { prank: [selected_card_positions[0]], witch_answer: true },
        })

      } else if (newGamestate.players[token].player_history[title].witch_answer) {
        const firstSelectedPositionCard = newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_card].card
        const secondSelectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card

        const selectedCenterCard = { ...firstSelectedPositionCard }
        const selectedPlayerCard = { ...secondSelectedPositionCard }
        newGamestate.card_positions[newGamestate.players[token].player_history[title].selected_card].card = selectedPlayerCard
        newGamestate.card_positions[selected_card_positions[0]].card = selectedCenterCard

        if (selected_card_positions[0] === currentPlayerNumber[0]) {
          const currentCard = newGamestate.card_positions[currentPlayerNumber[0]].card
          newGamestate.players[token].card.player_card_id = currentCard.id
          newGamestate.players[token].card.player_team = currentCard.team
        }

        newGamestate.players[token].player_history[title] = {
          ...newGamestate.players[token].player_history[title],
          swapped_cards: [newGamestate.players[token].player_history[title].selected_card, selected_card_positions[0]],
        }

        const messageIdentifiers = formatPlayerIdentifier([`${newGamestate.players[token].player_history[title].selected_card}`, selected_card_positions[0]])

        interaction = generateRoleInteraction(newGamestate, token, {
          private_message: ['interaction_swapped_cards', ...messageIdentifiers],
          icon: 'prank',
          uniqueInformations: { prank: [newGamestate.players[token].player_history[title].selected_card, selected_card_positions[0]] },
        })

      }
      break

    case 'drunk':
    case 'robber':
      { const selectedPosition = selected_card_positions[0]
      const selectedCard = { ...newGamestate.card_positions[selectedPosition].card }

      newGamestate.card_positions[currentPlayerNumber].card = selectedCard
      newGamestate.card_positions[selectedPosition].card = currentPlayerCard

      if (newGamestate.players[token].player_history[title].random === 'drunk') {
        newGamestate.players[token].card.player_card_id = 0
      } else {
        newGamestate.players[token].card.player_card_id = newGamestate.card_positions[currentPlayerNumber].card.id
        newGamestate.players[token].card.player_team = newGamestate.card_positions[currentPlayerNumber].card.team
      }

      const showCards = getCardIdsByPlayerNumbers(newGamestate.card_positions, [currentPlayerNumber])

      newGamestate.players[token].card_or_mark_action = true

      newGamestate.players[token].player_history[title] = {
        ...newGamestate.players[token].player_history[title],
        swapped_cards: [currentPlayerNumber, selectedPosition],
        viewed_cards: [currentPlayerNumber],
      }

      const messageIds = formatPlayerIdentifier([currentPlayerNumber, selectedPosition])

      interaction = generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_swapped_cards', ...messageIds, newGamestate.players[token].player_history[title].random === 'robber' ? 'interaction_own_card' : ''],
        icon: 'prank',
        showCards: newGamestate.players[token].player_history[title].random === 'robber' ? showCards : undefined,
        uniqueInformations: { prank: [currentPlayerNumber, selectedPosition] },
      })

      break }
  }


  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}

