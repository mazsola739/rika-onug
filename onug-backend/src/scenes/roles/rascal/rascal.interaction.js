import { CENTER_CARD_POSITIONS } from "../../../constants"
import { getAllPlayerTokens, getAnyEvenOrOddPlayers, getPlayerNeighborsByToken, getSelectablePlayersWithNoShield, generateRoleInteraction, getSelectableOtherPlayerNumbersWithNoShield } from "../../sceneUtils"
import { getAnyHigherOrLowerPlayerNumbersByToken } from "./rascal.utils"

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
    selectableCards: { selectable_cards: selectableCards, selectable_card_limit: selectableLimit },
  })
}
