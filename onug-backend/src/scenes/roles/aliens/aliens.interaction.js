import {
  formatPlayerIdentifier,
  generateRoleInteraction,
  getAlienPlayerNumbersByRoleIds,
  getAnyEvenOrOddPlayers,
  getCardIdsByPlayerNumbers,
  getNonAlienPlayerNumbersByRoleIdsWithNoShield,
  getPlayerNumberWithMatchingToken,
} from '../../sceneUtils'
import {
  findUniqueElementsInArrays,
  getAlienPlayerNumbersByRoleIdsWithNoShield,
  getNeighborByPosition,
  getSelectableAnyPlayerNumbersWithNoShield,
  moveCards,
} from './aliens.utils'

/* New Alien
Some players, via app, put their fist out. Aliens collectively choose one to tap who becomes an Alien and loses their original power
Alien Helper
Some players, via app, put their fist out. Aliens collectively choose one to tap who joins the Alien team but retains their original power */

export const aliensInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const aliens = getAlienPlayerNumbersByRoleIds(newGamestate.players)
  const aliensWithoutShield = getAlienPlayerNumbersByRoleIdsWithNoShield(
    newGamestate.players
  )
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(
    newGamestate.players,
    token
  )
  const randomAlienInstruction = newGamestate.alien.instruction
  const alienKey = newGamestate.alien.key

  let selectableCards = {}
  let showCards = []
  let privateMessage = ['interaction_aliens']

  if (alienKey.length > 1) {
    const selectablePlayerNumbers = alienKey
      .filter((key) => key.includes('identifier_player'))
      .map((key) => key.replace('identifier_', ''))
    const playerNumbersWithNoShield = getSelectableAnyPlayerNumbersWithNoShield(
      newGamestate.players
    )
    const selectablePlayers = findUniqueElementsInArrays(
      playerNumbersWithNoShield,
      selectablePlayerNumbers
    )
    selectableCards = {
      selectable_cards: selectablePlayers,
      selectable_card_limit: { player: 1, center: 0 },
    }
  } else {
    const evenOrOdd =
      alienKey.length === 1 && (alienKey[0].includes('even') ? 'even' : 'odd')
    const evenOrOddPlayers = evenOrOdd
      ? getAnyEvenOrOddPlayers(newGamestate.players, evenOrOdd)
      : newGamestate.players
    const selectableNonAlienPlayers =
      randomAlienInstruction === 'aliens_newalien_text' ||
      randomAlienInstruction === 'aliens_alienhelper_text'
        ? getSelectableAnyPlayerNumbersWithNoShield(evenOrOddPlayers)
        : getNonAlienPlayerNumbersByRoleIdsWithNoShield(evenOrOddPlayers)
    selectableCards = {
      selectable_cards: selectableNonAlienPlayers,
      selectable_card_limit: { player: 1, center: 0 },
    }
  }

  switch (randomAlienInstruction) {
    case 'aliens_view_text':
    case 'aliens_allview_text':
      if (newGamestate.players[token].shield) {
        newGamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
      } else {
        privateMessage.push('interaction_may_one_any')
      }

      break
    case 'aliens_left_text':
    case 'aliens_right_text':
      if (newGamestate.players[token].shield) {
        newGamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
      } else {
        const direction = randomAlienInstruction.includes('left')
          ? 'left'
          : 'right'
        const neighbor = getNeighborByPosition(
          aliensWithoutShield,
          currentPlayerNumber,
          direction
        )
        const updatedPlayerCards = moveCards(
          newGamestate.card_positions,
          direction,
          aliensWithoutShield
        )
        newGamestate.players[token].card_or_mark_action = true
        newGamestate.card_positions = {
          ...newGamestate.card_positions,
          ...updatedPlayerCards,
        }
        privateMessage.push(
          'interaction_moved_yours',
          formatPlayerIdentifier([neighbor])[0]
        )
      }

      break
    case 'aliens_show_text':
      showCards = getCardIdsByPlayerNumbers(
        newGamestate.card_positions,
        aliensWithoutShield
      )
      showCards.forEach((key) => {
        const card = newGamestate.card_positions[key].card

        if (
          newGamestate.players[token]?.card?.original_id === card.id &&
          currentPlayerNumber !== key
        ) {
          newGamestate.players[token].card.player_card_id = 87
        } else if (currentPlayerNumber === key) {
          newGamestate.players[token].card.player_card_id = card.id
          newGamestate.players[token].card.player_team = card.team
        }
      })

      if (newGamestate.players[token].shield) {
        newGamestate.players[token].player_history[title].shielded = true
        privateMessage.push('interaction_shielded')
      } else {
        privateMessage.push(...formatPlayerIdentifier(aliensWithoutShield))
      }

      break
    case 'aliens_timer_text':
      newGamestate.vote_timer /= 2
      privateMessage.push('interaction_timer')

      break
    case 'aliens_newalien_text':
    case 'aliens_alienhelper_text':
      privateMessage.push('interaction_must_one_any_other')
      break
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    ...selectableCards,
    private_message: privateMessage,
    aliens,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    showCards,
    selectableCards,
    uniqueInformations: { aliens },
  })
}
