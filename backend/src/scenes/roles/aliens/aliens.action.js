import { getPlayerNumbersByGivenConditions, getPlayerNumberWithMatchingToken, formatPlayerIdentifier, getSelectablePlayersWithNoShield, getAnyEvenOrOddPlayerNumbers, getNonAlienPlayerNumbersWithNoShield, getNeighborByPosition, moveCards, getCardIdsByPositions, generateRoleAction, getAllPlayerTokens } from '../../sceneUtils'

export const aliensAction = (gamestate, token, title) => {
  // TODO fix: only work with cow, if in the selected cards
  const aliens = getPlayerNumbersByGivenConditions(gamestate.players, 'alien')
  const cow = getPlayerNumbersByGivenConditions(gamestate.players, 'cow')

  const aliensWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'alienWithoutShield', gamestate.shielded_cards)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  const randomAlienInstruction = gamestate.aliens.instruction
  const alienKey = gamestate.aliens.key

  const isSingleAlien = aliens.length === 1

  let selectableCards = {}
  let selectablePlayers = []
  let showCards = []
  let obligatory = false
  let scene_end = false
  let vote = false
  let viewCards = []
  let new_alien = []
  let new_alien_helper = []

  const messageIdentifiers = formatPlayerIdentifier(aliens)
  let privateMessage = isSingleAlien ? ['action_no_aliens'] : ['action_aliens', ...messageIdentifiers, 'POINT']

  if (alienKey.length > 0 && alienKey[0].includes('identifier_player')) {
    const selectablePlayerNumbers = alienKey.filter(key => key.includes('identifier_player')).map(key => `player_${key.replace('identifier_player', '').replace('_text', '')}`)

    selectablePlayers = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.shielded_cards)
  } else if (alienKey.length > 0) {
    //TODO fix alien non alien, odd even or everyone part.
    const evenOrOdd = alienKey[0].includes('even') ? 'even' : alienKey[0].includes('odd') ? 'odd' : ''

    const evenOrOddPlayerNumbers = evenOrOdd ? getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd) : getAllPlayerTokens(gamestate.players)

    if (randomAlienInstruction === 'aliens_alienhelper_text') {
      selectablePlayers = getNonAlienPlayerNumbersWithNoShield(evenOrOddPlayerNumbers, aliens, gamestate.shielded_cards)
    } else {
      selectablePlayers = getSelectablePlayersWithNoShield(evenOrOddPlayerNumbers, gamestate.shielded_cards)
    }
  }

  const isSingleSelectionOption = selectablePlayers.length === 1

  switch (randomAlienInstruction) {
    case 'aliens_stare_text':
      scene_end = true
      break
    case 'aliens_view_text': //TODO fix showcards
    case 'aliens_allview_text':
      if (gamestate.players[token].shield) {
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('action_shielded')
        scene_end = true
      } else {
        privateMessage.push('action_may_one_any')
        if (!isSingleSelectionOption) {
          selectableCards = {
            selectable_cards: selectablePlayers,
            selectable_card_limit: { player: 1, center: 0 }
          }
        }
        if (randomAlienInstruction === 'aliens_allview_text') {
          // TODO: Update logic for obligatory and scene_end 
          //vote = true
          obligatory = false //todo change to true if fixed
          scene_end = true //todo delete if fixed
          privateMessage.push('FYI_TBD', 'action_must_one_any_other')
          if (selectablePlayers.length === 0) {
            privateMessage.push('no_selectable_option')
            scene_end = true
            selectableCards = {}
          }
        }
      }
      break
    //TODO fix if no possible alien to move 
    case 'aliens_left_text':
    case 'aliens_right_text':
      if (gamestate.players[token].shield) {
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('action_shielded')
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        const updatedPlayerCards = moveCards(gamestate.card_positions, direction, aliensWithoutShield)
        gamestate.players[token].card_or_mark_action = true

        if (!gamestate.players[token].moved_card) {
          gamestate.card_positions = {
            ...gamestate.card_positions,
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
    case 'aliens_show_text':
      showCards = getCardIdsByPositions(gamestate.card_positions, aliensWithoutShield)

      showCards.forEach(entry => {
        const key = Object.keys(entry)[0]
        const cardId = entry[key]

        const playerCardPosition = gamestate.card_positions[key]

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
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('action_shielded')
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      scene_end = true
      break
    case 'aliens_timer_text':
      gamestate.vote_timer /= 2
      privateMessage.push('action_timer')
      scene_end = true

      break
    case 'aliens_newalien_text':
    case 'aliens_alienhelper_text':
      // vote = true
      privateMessage.push('FYI_TBD', 'action_must_one_any_other')
      obligatory = false //todo change to true if fixed
      scene_end = true //todo delete if fixed

      if (isSingleSelectionOption) {
        gamestate.card_positions[selectablePlayers[0]].card.team = 'alien'
        new_alien = [selectablePlayers[0]]

        scene_end = true
        let message = ['action_turned_alienhelper', formatPlayerIdentifier([selectablePlayers[0]])[0]]

        if (randomAlienInstruction === 'aliens_newalien_text') {
          gamestate.card_positions[selectablePlayers[0]].card.role = 'ALIEN'
          message = ['action_turned_newalien', formatPlayerIdentifier([selectablePlayers[0]])[0]]
        }
        privateMessage.push(...message)
      } else if (selectablePlayers.length === 0) {
        privateMessage.push('no_selectable_option')
        scene_end = true
      } else {
        selectableCards = {
          selectable_cards: selectablePlayers,
          selectable_card_limit: { player: 1, center: 0 }
        }
      }

      break
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    ...selectableCards,
    private_message: privateMessage,
    aliens,
    obligatory,
    viewed_cards: viewCards,
    new_alien,
    new_alien_helper,
    scene_end,
    vote
  }

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    showCards,
    selectableCards,
    uniqueInformation: { aliens, cow, vote, new_alien, new_alien_helper },
    obligatory,
    scene_end
  })
}
