import {
  formatPlayerIdentifier,
  generateRoleInteraction,
  getAlienPlayerNumbersByRoleIds,
  getAnyEvenOrOddPlayers,
  getCardIdsByPlayerNumbers,
  getNonAlienPlayerNumbersByRoleIdsWithNoShield,
  getPlayerNumberWithMatchingToken
} from '../../sceneUtils'
import { findUniqueElementsInArrays, getAlienPlayerNumbersByRoleIdsWithNoShield, getNeighborByPosition, getSelectableAnyPlayerNumbersWithNoShield, moveCards } from './aliens.utils'

/* New Alien
Some players, via app, put their fist out. Aliens collectively choose one to tap who becomes an Alien and loses their original power
Alien Helper
Some players, via app, put their fist out. Aliens collectively choose one to tap who joins the Alien team but retains their original power */

export const aliensInteraction = (gamestate, token, title) => {
  const aliens = getAlienPlayerNumbersByRoleIds(gamestate.players)
  const aliensWithoutShield = getAlienPlayerNumbersByRoleIdsWithNoShield(gamestate.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const randomAlienInstruction = gamestate.alien.instruction
  const alienKey = gamestate.alien.key

  let selectableCards = {}
  let showCards = []

  const messageIdentifiers = formatPlayerIdentifier(aliens)
  let privateMessage = aliens.length === 1 ? ['interaction_no_aliens'] : ['interaction_aliens', ...messageIdentifiers]

  if (alienKey.length > 1) {
    const selectablePlayerNumbers = alienKey.filter(key => key.includes('identifier_player')).map(key => key.replace('identifier_', ''))
    const playerNumbersWithNoShield = getSelectableAnyPlayerNumbersWithNoShield(gamestate.players)
    const selectablePlayers = findUniqueElementsInArrays(playerNumbersWithNoShield, selectablePlayerNumbers)
    selectableCards = {
      selectable_cards: selectablePlayers,
      selectable_card_limit: { player: 1, center: 0 }
    }
  } else {
    const evenOrOdd = alienKey.length === 1 && (alienKey[0].includes('even') ? 'even' : 'odd')
    const evenOrOddPlayers = evenOrOdd ? getAnyEvenOrOddPlayers(gamestate.players, evenOrOdd) : gamestate.players
    const selectableNonAlienPlayers =
      randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text'
        ? getSelectableAnyPlayerNumbersWithNoShield(evenOrOddPlayers)
        : getNonAlienPlayerNumbersByRoleIdsWithNoShield(evenOrOddPlayers)
    selectableCards = {
      selectable_cards: selectableNonAlienPlayers,
      selectable_card_limit: { player: 1, center: 0 }
    }
  }

  switch (randomAlienInstruction) {
    case 'aliens_view_text':
    case 'aliens_allview_text':
      if (gamestate.players[token].shield) {
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
      } else {
        privateMessage.push('interaction_may_one_any')
      }

      break
    case 'aliens_left_text':
    case 'aliens_right_text':
      if (gamestate.players[token].shield) {
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
      } else {
        const direction = randomAlienInstruction.includes('left') ? 'left' : 'right'
        const neighbor = getNeighborByPosition(aliensWithoutShield, currentPlayerNumber, direction)
        const updatedPlayerCards = moveCards(gamestate.card_positions, direction, aliensWithoutShield)
        gamestate.players[token].card_or_mark_action = true
        gamestate.card_positions = {
          ...gamestate.card_positions,
          ...updatedPlayerCards
        }
        privateMessage.push('interaction_moved_yours', formatPlayerIdentifier([neighbor])[0])
      }

      break
    case 'aliens_show_text':
      showCards = getCardIdsByPlayerNumbers(gamestate.card_positions, aliensWithoutShield)
      showCards.forEach(key => {
        const card = gamestate.card_positions[key].card

        if (gamestate.players[token]?.card?.original_id === card.id && currentPlayerNumber !== key) {
          gamestate.players[token].card.player_card_id = 87
        } else if (currentPlayerNumber === key) {
          gamestate.players[token].card.player_card_id = card.id
          gamestate.players[token].card.player_team = card.team
        }
      })

      if (gamestate.players[token].shield) {
        gamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      break
    case 'aliens_timer_text':
      gamestate.vote_timer /= 2
      privateMessage.push('interaction_timer')

      break
    case 'aliens_newalien_text':
    case 'aliens_alienhelper_text':
      privateMessage.push('interaction_must_one_any_other')
      break
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    ...selectableCards,
    private_message: privateMessage,
    aliens,
    obligatory: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: privateMessage,
    showCards,
    selectableCards,
    uniqueInformations: { aliens },
    obligatory: true
  })
}
