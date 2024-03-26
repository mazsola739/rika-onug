//@ts-check
import { centerCardPositions, copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getAnyEvenOrOddPlayers, getAnyHigherOrLowerPlayerNumbersByToken, getPlayerNeighborsByToken, getSelectablePlayersWithNoShield, getSelectableOtherPlayerNumbersWithoutShield } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
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

const randomRascalInstruction = getRandomItemFromArray(randomRascalInstructions)
const randomAnyOne = getRandomItemFromArray(rascalAnyOneKeys)
const randomAnyTwo = getRandomItemFromArray(rascalAnyTwoKeys)

const createRascal = prefix => {
  const result = [`${prefix}_kickoff_text`]

  switch (randomRascalInstruction) {
    case 'rascal_troublemaker_text':
      result[1] = 'rascal_troublemaker_text'
      result[2] = randomAnyTwo
      break
    case 'rascal_witch_text':
      result[1] = 'rascal_witch_text'
      result[2] = randomAnyOne
      result[3] = 'rascal_witchend_text'
      break
    case 'rascal_drunk_text':
      result[1] = 'rascal_drunk_text'
      result[2] = randomAnyOne
      result[3] = 'rascal_drunkend_text'
      break
    case 'rascal_robber_text':
      result[1] = 'rascal_robber_text'
      result[2] = randomAnyOne
      result[3] = 'rascal_robberend_text'
      break
    case 'rascal_idiot_text':
      result[1] = 'rascal_idiot_text'
  }

  return result
}

export const rascal = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createRascal(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'rascal') {
      if (card.player_original_id === 52 || (card.player_role_id === 52 && copyPlayerIds.includes(card.player_original_id))) {
        if (randomRascalInstruction === "rascal_idiot_text") {
          interaction = villageidiot_interaction(newGameState, token, title)
        } else {
          interaction = rascal_interaction(newGameState, token, title, randomRascalInstruction, randomAnyOne, randomAnyTwo)
        }
        
      }
    } else if (prefix === 'doppelganger_rascal') {
      if (card.player_role_id === 52 && card.player_original_id === 1) {
        if (randomRascalInstruction === "rascal_idiot_text") {
          interaction = villageidiot_interaction(newGameState, token, title)
        } else {
          interaction = rascal_interaction(newGameState, token, title, randomRascalInstruction, randomAnyOne, randomAnyTwo)
        }
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const rascal_interaction = (gameState, token, title, randomRascalInstruction, randomAnyOne, randomAnyTwo) => {
  const newGameState = { ...gameState }
  
  let privateMessage
  let limit = 1 
  let selectableCards
  let selectableLimit

  const getSelectableTwoPlayers = (randomAnyTwo) => {
    switch (randomAnyTwo) {
      case 'identifier_any2_text':
        return getAllPlayerTokens(newGameState.players)

      case 'identifier_any2even_text':
      case 'identifier_any2odd_text':
        const evenOrOddTwo = randomAnyTwo.replace('identifier_any2', '').replace('_text', '')
        return getAnyEvenOrOddPlayers(newGameState.players, evenOrOddTwo)

      case 'identifier_any2higher_text':
      case 'identifier_any2lower_text':
        const higherOrLowerTwo = randomAnyTwo.replace('identifier_any2', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(newGameState.players, higherOrLowerTwo)

      case 'identifier_2leftneighbors_text':
      case 'identifier_2rightneighbors_text':
      case 'identifier_bothneighbors_text':
        const directionTwo = randomAnyTwo.includes('left') ? 'left' : randomAnyTwo.includes('right') ? 'right' : 'both'
        const amountTwo = randomAnyTwo.includes('2') ? 2 : 1
        return getPlayerNeighborsByToken(newGameState.players, directionTwo, amountTwo)
    }
  }

  const getSelectableOnePlayers = (randomAnyOne) => {
    switch (randomAnyOne) {
      case 'identifier_higher_text':
      case 'identifier_lower_text':
        const higherOrLowerOne = randomAnyOne.replace('identifier_', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(newGameState.players, higherOrLowerOne)

      case 'identifier_any_text':
        return getAllPlayerTokens(newGameState.players)

      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text':
        const evenOrOddOne = randomAnyOne.replace('identifier_any', '').replace('_text', '')
        return getAnyEvenOrOddPlayers(newGameState.players, evenOrOddOne)

      case 'identifier_oneneighbor_text':
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text':
        const directionOne = randomAnyOne.includes('left') ? 'left' : randomAnyOne.includes('right') ? 'right' : 'both'
        return getPlayerNeighborsByToken(newGameState.players, directionOne, 1)
    }
  }

  const selectableTwoPlayers = getSelectableTwoPlayers(randomAnyTwo)
  const selectableOnePlayers = getSelectableOnePlayers(randomAnyOne)

  if (randomRascalInstruction === 'rascal_troublemaker_text') {
    selectableCards = getSelectablePlayersWithNoShield(selectableTwoPlayers)
    limit = 2
    privateMessage = [selectableCards.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_two_any']
  } else if (randomRascalInstruction === 'rascal_drunk_text' || randomRascalInstruction === 'rascal_robber_text') {
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
    } else {
      selectableCards = randomAnyOne === 'identifier_center_text' ? centerCardPositions : getSelectableOtherPlayerNumbersWithoutShield(selectableOnePlayers, token)
      privateMessage = [selectableCards.length === 0 ? 'interaction_no_selectable_player' : randomRascalInstruction === 'rascal_drunk_text' ? 'interaction_must_one_any_other' : 'interaction_may_one_any_other']
    }
  } else {
    selectableCards = randomAnyOne === 'identifier_center_text' ? centerCardPositions : getSelectablePlayersWithNoShield(selectableOnePlayers)
    privateMessage = [selectableCards.length === 0 ? 'interaction_no_selectable_player' : 'interaction_may_one_any_other']
  }

  if (selectableCards === centerCardPositions) {
    selectableLimit = { player: 0, center: limit  }
  } else {
    selectableLimit = { player: limit , center: 0 }
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectableCards, selectable_card_limit: selectableLimit,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: 'drunk',
    selectableCards: { selectable_cards: selectableCards, selectable_card_limit: selectableLimit },
  })
}

export const rascal_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []

  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
