import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction, getAllPlayerTokens, getAnyEvenOrOddPlayerNumbers, getPlayerNeighborsByToken, getPlayerNumbersByGivenConditions, getSelectablePlayersWithNoShield } from '../../sceneUtils'

export const rascalAction = (gamestate, token, title, prefix) => {
  const randomRascalInstruction = gamestate.roles[prefix].instruction
  const rascalKey = gamestate.roles[prefix].key

  let privateMessage
  let limit = 1
  let selectable_cards
  let selectable_card_limit
  //TODO  scene_end: selectablePlayerNumbers.length === 0

  const getAnyHigherOrLowerPlayerNumbersByToken = (players, token, higherOrLower) => {
    const playerNumber = parseInt(players[token].player_number.replace('player_', ''), 10)
    const result = {}

    if (higherOrLower === 'lower') {
      for (let i = playerNumber - 1; i >= 1; i--) {
        result[i] = players[Object.keys(players).find(key => players[key].player_number === `player_${i}`)]
      }
    } else if (higherOrLower === 'higher') {
      const totalPlayers = Object.keys(players).length
      for (let i = playerNumber + 1; i <= totalPlayers; i++) {
        result[i] = players[Object.keys(players).find(key => players[key].player_number === `player_${i}`)]
      }
    }

    return result
  }

  const getSelectableTwoPlayers = rascalKey => {
    switch (rascalKey) {
      case 'identifier_any2':
        return getAllPlayerTokens(gamestate.players)

      case 'identifier_any2even':
      case 'identifier_any2odd': {
        const evenOrOddTwo = rascalKey.replace('identifier_any2', '')
        return getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOddTwo)
      }

      case 'identifier_any2higher':
      case 'identifier_any2lower': {
        const higherOrLowerTwo = rascalKey.replace('identifier_any2', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(gamestate.players, higherOrLowerTwo)
      }

      case 'identifier_2leftneighbors':
      case 'identifier_2rightneighbors':
      case 'identifier_bothneighbors': {
        const directionTwo = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        const amountTwo = rascalKey.includes('2') ? 2 : 1
        return getPlayerNeighborsByToken(gamestate.players, token, directionTwo, amountTwo)
      }
    }
  }

  const getSelectableOnePlayers = rascalKey => {
    switch (rascalKey) {
      case 'identifier_higher':
      case 'identifier_lower': {
        const higherOrLowerOne = rascalKey.replace('identifier_', '')
        return getAnyHigherOrLowerPlayerNumbersByToken(gamestate.players, higherOrLowerOne)
      }

      case 'identifier_any':
        return getAllPlayerTokens(gamestate.players)

      case 'identifier_anyeven':
      case 'identifier_anyodd': {
        const evenOrOddOne = rascalKey.replace('identifier_any', '')
        return getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOddOne)
      }

      case 'identifier_oneneighbor':
      case 'identifier_leftneighbor':
      case 'identifier_rightneighbor': {
        const directionOne = rascalKey.includes('left') ? 'left' : rascalKey.includes('right') ? 'right' : 'both'
        return getPlayerNeighborsByToken(gamestate.players, token, directionOne, 1)
      }
    }
  }
  //todo better solution to get selectable players
  const selectableTwoPlayers = getSelectableTwoPlayers(rascalKey)
  const selectableOnePlayers = getSelectableOnePlayers(rascalKey)

  if (randomRascalInstruction === 'rascal_troublemaker') {
    selectable_cards = getSelectablePlayersWithNoShield(selectableTwoPlayers) <= 2 ? [] : getSelectablePlayersWithNoShield(selectableTwoPlayers)
    limit = selectable_cards.length >= 2 ? 2 : 0
    privateMessage = [selectable_cards.length >= 2 ? 'action_may_two_any' : 'action_no_selectable_player']
  } else if (randomRascalInstruction === 'rascal_drunk' || randomRascalInstruction === 'rascal_robber') {
    if (gamestate.players[token].shield) {
      return generateRoleAction(gamestate, token, title, {
        private_message: ['action_shielded'],
      })
    } else {
      selectable_cards =
        rascalKey === 'identifier_center' ? CENTER_CARD_POSITIONS : getPlayerNumbersByGivenConditions(gamestate.players, 'otherPlayersWithoutShield', gamestate.positions.shielded_cards, token)
      privateMessage = [selectable_cards.length === 0 ? 'action_no_selectable_player' : randomRascalInstruction === 'rascal_drunk' ? 'action_must_one_any_other' : 'action_may_one_any_other']
    }
  } else {
    selectable_cards = rascalKey === 'identifier_center' ? CENTER_CARD_POSITIONS : getSelectablePlayersWithNoShield(selectableOnePlayers)
    privateMessage = [selectable_cards.length === 0 ? 'action_no_selectable_player' : 'action_may_one_any_other']
  }

  if (selectable_cards === CENTER_CARD_POSITIONS) {
    selectable_card_limit = { player: 0, center: limit }
  } else {
    selectable_card_limit = { player: limit, center: 0 }
  }

  const random = randomRascalInstruction.replace('rascal_', '')
  const obligatory = randomRascalInstruction === 'rascal_drunk'

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    selectableCards: { selectable_cards, selectable_card_limit },
    uniqueInformation: { random },
    obligatory
  })
}
