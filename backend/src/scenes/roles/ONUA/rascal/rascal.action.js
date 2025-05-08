import { CENTER_CARD_POSITIONS } from '../../../../constants'
import { generateRoleAction, getAllPlayerTokens, getAnyEvenOrOddPlayerNumbers, getAnyHigherOrLowerPlayerNumbersByToken, getPlayerNeighborsByToken, getSelectableOtherPlayerNumbersWithNoShield, getSelectablePlayersWithNoShield } from '../../../sceneUtils'

export const rascalAction = (gamestate, token, title, prefix) => {
  const randomRascalInstruction = gamestate.roles[prefix].instruction
  const rascalKey = gamestate.roles[prefix].key

  let privateMessage
  let limit = 1
  let selectableCards
  let selectableLimit
  //TODO  scene_end: selectablePlayerNumbers.length === 0

  const getSelectableTwoPlayers = rascalKey => {
    switch (rascalKey) {
      case 'identifier_any2_text':
        return getAllPlayerTokens(gamestate.players)

      case 'identifier_any2even_text':
      case 'identifier_any2odd_text': {
        const evenOrOddTwo = rascalKey.replace('identifier_any2', '').replace('_text', '')
        return getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOddTwo)
      }

      case 'identifier_any2higher_text':
      case 'identifier_any2lower_text': {
        const higherOrLowerTwo = rascalKey.replace('identifier_any2', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(gamestate.players, higherOrLowerTwo)
      }

      case 'identifier_2leftneighbors_text':
      case 'identifier_2rightneighbors_text':
      case 'identifier_bothneighbors_text': {
        const directionTwo = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        const amountTwo = rascalKey.includes('2') ? 2 : 1
        return getPlayerNeighborsByToken(gamestate.players, token, directionTwo, amountTwo)
      }
    }
  }

  const getSelectableOnePlayers = rascalKey => {
    switch (rascalKey) {
      case 'identifier_higher_text':
      case 'identifier_lower_text': {
        const higherOrLowerOne = rascalKey.replace('identifier_', '').replace('_text', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(gamestate.players, higherOrLowerOne)
      }

      case 'identifier_any_text':
        return getAllPlayerTokens(gamestate.players)

      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text': {
        const evenOrOddOne = rascalKey.replace('identifier_any', '').replace('_text', '')
        return getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOddOne)
      }

      case 'identifier_oneneighbor_text':
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text': {
        const directionOne = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        return getPlayerNeighborsByToken(gamestate.players, token, directionOne, 1)
      }
    }
  }
  //todo better solution to get selectable players
  const selectableTwoPlayers = getSelectableTwoPlayers(rascalKey)
  const selectableOnePlayers = getSelectableOnePlayers(rascalKey)

  if (randomRascalInstruction === 'rascal_troublemaker_text') {
    selectableCards = getSelectablePlayersWithNoShield(selectableTwoPlayers) <= 2 ? [] : getSelectablePlayersWithNoShield(selectableTwoPlayers)
    limit = selectableCards.length >= 2 ? 2 : 0
    privateMessage = [selectableCards.length >= 2 ? 'action_may_two_any' : 'action_no_selectable_player']
  } else if (randomRascalInstruction === 'rascal_drunk_text' || randomRascalInstruction === 'rascal_robber_text') {
    if (gamestate.players[token].shield) {
      gamestate.players[token].player_history[title] = {
        ...gamestate.players[token].player_history[title],
        shielded: true
      }

      return generateRoleAction(gamestate, token, {
        private_message: ['action_shielded']
      })
    } else {
      selectableCards = rascalKey === 'identifier_center_text' ? CENTER_CARD_POSITIONS : getSelectableOtherPlayerNumbersWithNoShield(selectableOnePlayers, token)
      privateMessage = [selectableCards.length === 0 ? 'action_no_selectable_player' : randomRascalInstruction === 'rascal_drunk_text' ? 'action_must_one_any_other' : 'action_may_one_any_other']
    }
  } else {
    selectableCards = rascalKey === 'identifier_center_text' ? CENTER_CARD_POSITIONS : getSelectablePlayersWithNoShield(selectableOnePlayers)
    privateMessage = [selectableCards.length === 0 ? 'action_no_selectable_player' : 'action_may_one_any_other']
  }

  if (selectableCards === CENTER_CARD_POSITIONS) {
    selectableLimit = { player: 0, center: limit }
  } else {
    selectableLimit = { player: limit, center: 0 }
  }

  const random = randomRascalInstruction.replace('rascal_', '').replace('_text', '')

  const obligatory = randomRascalInstruction === 'rascal_drunk_text'

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    selectable_cards: selectableCards,
    selectable_card_limit: selectableLimit,
    random,
    obligatory
  }

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    selectableCards: {
      selectable_cards: selectableCards,
      selectable_card_limit: selectableLimit
    },
    obligatory
  })
}
