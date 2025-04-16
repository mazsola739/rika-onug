import { getPlayerNumbersByGivenConditions, getPlayerNumberWithMatchingToken, formatPlayerIdentifier, getSelectablePlayersWithNoShield, getAnyEvenOrOddPlayerNumbers, getNonAlienPlayerNumbersWithNoShield, getNeighborByPosition, moveCards, getCardIdsByPositions, generateRoleAction } from '../../sceneUtils'

export const aliensAction = (gamestate, token, title) => {
  // TODO fix: only work with cow, if in the selected cards
  // Get all players with the role 'alien' and 'cow'
  const aliens = getPlayerNumbersByGivenConditions(gamestate.players, 'alien')
  const cow = getPlayerNumbersByGivenConditions(gamestate.players, 'cow')

  // Get aliens without shields
  const aliensWithoutShield = getPlayerNumbersByGivenConditions(gamestate.players, 'alienWithoutShield', gamestate.shielded_cards)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  // Retrieve alien-specific instructions and keys
  const randomAlienInstruction = gamestate.aliens.instruction
  const alienKey = gamestate.aliens.key

  // Check if there is only one alien
  const isSingleAlien = aliens.length === 1

  // Initialize variables for game state updates
  let selectableCards = {}
  let selectablePlayers = []
  let showCards = []
  let obligatory = false
  let scene_end = false
  let vote = false
  let viewCards = []
  let new_alien = []
  let new_alien_helper = []

  // Format identifiers for private messages
  const messageIdentifiers = formatPlayerIdentifier(aliens)
  let privateMessage = isSingleAlien ? ['action_no_aliens'] : ['action_aliens', ...messageIdentifiers, 'POINT']

  // Handle alien key logic for determining selectable players
  if (alienKey.length > 0 && alienKey[0].includes('identifier_player')) {
    const selectablePlayerNumbers = alienKey.filter(key => key.includes('identifier_player')).map(key => `player_${key.replace('identifier_player', '').replace('_text', '')}`)

    // Filter players who are not shielded
    selectablePlayers = getSelectablePlayersWithNoShield(selectablePlayerNumbers, gamestate.shielded_cards)
  } else if (alienKey.length > 0) {
    const evenOrOdd = alienKey[0].includes('even') ? 'even' : alienKey[0].includes('odd') ? 'odd' : ''

    // Determine even or odd players based on the key
    const evenOrOddPlayerNumbers = evenOrOdd ? getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd) : getPlayerNumberWithMatchingToken(gamestate.players, token)

    if (randomAlienInstruction === 'aliens_alienhelper_text') {
      // Get non-alien players without shields
      selectablePlayers = getNonAlienPlayerNumbersWithNoShield(evenOrOddPlayerNumbers, aliens, gamestate.shielded_cards)
    } else {
      selectablePlayers = getSelectablePlayersWithNoShield(evenOrOddPlayerNumbers, gamestate.shielded_cards)
    }
  }

  // Check if there is only one selectable player
  const isSingleSelectionOption = selectablePlayers.length === 1

  // Handle different alien instructions
  switch (randomAlienInstruction) {
    case 'aliens_stare_text':
      // End the scene without any further action
      scene_end = true
      break
    case 'aliens_view_text': //TODO fix showcards
    case 'aliens_allview_text':
      if (gamestate.players[token].shield) {
        // Mark the player as shielded and end the scene
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('action_shielded')
        scene_end = true
      } else {
        // Allow the player to view one card
        privateMessage.push('action_may_one_any')
        if (!isSingleSelectionOption) {
          selectableCards = {
            selectable_cards: selectablePlayers,
            selectable_card_limit: { player: 1, center: 0 }
          }
        }
        if (randomAlienInstruction === 'aliens_allview_text') {
          // TODO: Update logic for obligatory and scene_end
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
    case 'aliens_left_text':
    case 'aliens_right_text':
      if (gamestate.players[token].shield) {
        // Mark the player as shielded
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('action_shielded')
      } else {
        // Move cards in the specified direction
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        const updatedPlayerCards = moveCards(gamestate.card_positions, direction, aliensWithoutShield)
        gamestate.players[token].card_or_mark_action = true

        if (!gamestate.players[token].moved_card) {
          // Update card positions and mark all players as having moved cards
          gamestate.card_positions = {
            ...gamestate.card_positions,
            ...updatedPlayerCards
          }
          Object.keys(gamestate.players).forEach(playerToken => {
            gamestate.players[playerToken].moved_card = true
          })
        }

        // Update the player's card information
        gamestate.players[token].card.player_card_id = 87

        privateMessage.push('action_moved_yours', formatPlayerIdentifier([neighbor])[0])
      }
      scene_end = true

      break
    case 'aliens_show_text':
      // Show cards of aliens without shields
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
        // Mark the player as shielded
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('action_shielded')
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      scene_end = true
      break
    case 'aliens_timer_text':
      // Halve the vote timer
      gamestate.vote_timer /= 2
      privateMessage.push('action_timer')
      scene_end = true

      break
    case 'aliens_newalien_text':
    case 'aliens_alienhelper_text':
      // Handle turning a player into a new alien or alien helper
      privateMessage.push('FYI_TBD', 'action_must_one_any_other')
      obligatory = false //todo change to true if fixed
      scene_end = true //todo delete if fixed

      if (isSingleSelectionOption) {
        // Update the selected player's team and role
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
        // No selectable players available
        privateMessage.push('no_selectable_option')
        scene_end = true
      } else {
        // Allow selection of one player
        selectableCards = {
          selectable_cards: selectablePlayers,
          selectable_card_limit: { player: 1, center: 0 }
        }
      }

      break
  }

  // Update the player's history with the current action details
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

  // Generate the role action result
  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    showCards,
    selectableCards,
    uniqueInformation: { aliens, cow, vote, new_alien, new_alien_helper },
    obligatory,
    scene_end
  })
}
