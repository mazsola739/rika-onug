import {
  getPlayerNumbersByGivenConditions,
  formatPlayerIdentifier,
  getSelectablePlayersWithNoShield,
  getAnyEvenOrOddPlayerNumbers,
  getCardIdsByPositions,
  generateRoleAction,
  getAllPlayerTokens
} from '../../sceneUtils'

export const aliensAction = (gamestate, token, title) => {
  // TODO fix: only work with cow, if in the selected cards
  const aliens = getPlayerNumbersByGivenConditions(gamestate.players, 'alien')
  const cow = getPlayerNumbersByGivenConditions(gamestate.players, 'cow')

  const aliensWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'alienWithoutShield', gamestate.positions.shielded_cards)
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

  const randomAlienInstruction = gamestate.roles.aliens.instruction
  const alienKey = gamestate.roles.aliens.key

  const isSingleAlien = aliens.length === 1

  let selectable_cards = []
  let selectable_card_limit = { player: 0, center: 0 }
  let selectablePlayers = []
  let showCards = []
  let obligatory = false
  let scene_end = false
  let vote = false
  let viewed_cards = [] //TODO missing here
  let new_alien = []
  let new_alien_helper = []
  let shielded = false

  const messageIdentifiers = formatPlayerIdentifier(aliens)
  let privateMessage = isSingleAlien ? ['action_no_aliens'] : ['action_aliens', ...messageIdentifiers, 'POINT']

  if (alienKey.length > 0 && alienKey[0].includes('identifier_player')) {
    const selectablePlayerNumbers = alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_player', 'player_'))

    selectablePlayers = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.positions.shielded_cards)
  } else if (alienKey.length > 0) {
    //TODO fix alien non alien, odd even or everyone part.
    const evenOrOdd = alienKey[0].includes('even') ? 'even' : alienKey[0].includes('odd') ? 'odd' : ''

    const evenOrOddPlayerNumbers = evenOrOdd ? getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd) : getAllPlayerTokens(gamestate.players)

    if (randomAlienInstruction === 'aliens_alienhelper') {
      const getNonAlienPlayerNumbersWithNoShield = (players, aliens, shieldedCards) => players.filter(player => !aliens.includes(player) && !shieldedCards.includes(player))
      selectablePlayers = getNonAlienPlayerNumbersWithNoShield(evenOrOddPlayerNumbers, aliens, gamestate.positions.shielded_cards)
    } else {
      selectablePlayers = getSelectablePlayersWithNoShield(evenOrOddPlayerNumbers, gamestate.positions.shielded_cards)
    }
  }

  const isSingleSelectionOption = selectablePlayers.length === 1

  const getNeighborByPosition = (players, currentPlayerNumber, direction) => {
    const currentPlayer = players.indexOf(currentPlayerNumber)
    let neighborIndex

    if (direction === 'left') {
      neighborIndex = (currentPlayer - 1 + players.length) % players.length
    } else if (direction === 'right') {
      neighborIndex = (currentPlayer + 1) % players.length
    }

    return players[neighborIndex]
  }

  switch (randomAlienInstruction) {
    case 'aliens_stare':
      scene_end = true
      break
    case 'aliens_view': //TODO fix showcards
    case 'aliens_allview':
      if (gamestate.players[token].shield) {
        shielded = true
        privateMessage.push('action_shielded')
        scene_end = true
      } else {
        privateMessage.push('action_may_one_any')
        if (!isSingleSelectionOption) {
          selectable_cards = selectablePlayers
          selectable_card_limit = { player: 1, center: 0 }
        }
        if (randomAlienInstruction === 'aliens_allview') {
          // TODO: Update logic for obligatory and scene_end
          //vote = true
          obligatory = false //todo change to true if fixed
          scene_end = true //todo delete if fixed
          privateMessage.push('FYI_TBD', 'action_must_one_any_other')
          if (selectablePlayers.length === 0) {
            privateMessage.push('no_selectable_option')
            scene_end = true
          }
        }
      }
      break
    //TODO fix if no possible alien to move
    case 'aliens_left':
    case 'aliens_right':
      if (gamestate.players[token].shield) {
        shielded = true
        privateMessage.push('action_shielded')
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)

        const moveCards = (cards, direction, movablePlayers) => {
          const playerCards = Object.fromEntries(Object.entries(cards).filter(([key]) => key.startsWith('player_')))
          const staticCards = Object.fromEntries(Object.entries(playerCards).filter(([key]) => !movablePlayers.includes(key)))
          const movableCards = movablePlayers.map(player => playerCards[player])

          const shiftAmount = direction === 'right' ? 1 : -1

          const shiftedMovableCards = movablePlayers.reduce((acc, _player, index) => {
            const newIndex = (index + shiftAmount + movablePlayers.length) % movablePlayers.length
            acc[movablePlayers[newIndex]] = movableCards[index]
            return acc
          }, {})

          const updatedPlayerCards = { ...playerCards, ...staticCards, ...shiftedMovableCards }

          return updatedPlayerCards
        }

        const updatedPlayerCards = moveCards(gamestate.positions.card_positions, direction, aliensWithoutShield)
        gamestate.players[token].card_or_mark_action = true

        if (!gamestate.players[token].moved_card) {
          gamestate.positions.card_positions = {
            ...gamestate.positions.card_positions,
            ...updatedPlayerCards
          }
          Object.keys(gamestate.players).forEach(playerToken => {
            gamestate.players[playerToken].moved_card = true
          })
        }
        gamestate.players[token].card.player_card_id = 87

        privateMessage.push('action_moved_yours', formatPlayerIdentifier([neighbor])[0])
      }
      scene_end = true

      break
    case 'aliens_show':
      showCards = getCardIdsByPositions(gamestate.positions.card_positions, aliensWithoutShield)

      showCards.forEach(entry => {
        const key = Object.keys(entry)[0]
        const cardId = entry[key]

        const playerCardPosition = gamestate.positions.card_positions[key]

        if (playerCardPosition && playerCardPosition.card) {
          const card = playerCardPosition.card

          if (gamestate.players[token].card.player_original_id === cardId && currentPlayerNumber !== key) {
            gamestate.players[token].card.player_card_id = 87
          } else if (currentPlayerNumber === key) {
            gamestate.players[token].card.player_card_id = card.id
            gamestate.players[token].card.player_team = card.team
          }
        }
      })

      if (gamestate.players[token].shield) {
        shielded = true
        privateMessage.push('action_shielded')
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      scene_end = true
      break
    case 'aliens_timer':
      gamestate.vote_timer /= 2
      privateMessage.push('action_timer')
      scene_end = true

      break
    case 'aliens_newalien':
    case 'aliens_alienhelper':
      // vote = true
      privateMessage.push('FYI_TBD', 'action_must_one_any_other')
      obligatory = false //todo change to true if fixed
      scene_end = true //todo delete if fixed

      if (isSingleSelectionOption) {
        gamestate.positions.card_positions[selectablePlayers[0]].card.team = 'alien'
        new_alien = [selectablePlayers[0]]

        scene_end = true
        let message = ['action_turned_alienhelper', formatPlayerIdentifier([selectablePlayers[0]])[0]]

        if (randomAlienInstruction === 'aliens_newalien') {
          gamestate.positions.card_positions[selectablePlayers[0]].card.role = 'ALIEN'
          message = ['action_turned_newalien', formatPlayerIdentifier([selectablePlayers[0]])[0]]
        }
        privateMessage.push(...message)
      } else if (selectablePlayers.length === 0) {
        privateMessage.push('no_selectable_option')
        scene_end = true
      } else {
        selectable_cards = selectablePlayers
        selectable_card_limit = { player: 1, center: 0 }
      }

      break
  }

  const uniqueInformation = { aliens, cow, vote, new_alien, new_alien_helper, viewed_cards, shielded }

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    showCards,
    selectableCards: { selectable_cards, selectable_card_limit },
    uniqueInformation,
    obligatory,
    scene_end
  })
}
