import { CENTER_CARD_POSITIONS } from '../../../constants'
import {
  generateRoleInteraction,
  getAnyEvenOrOddPlayers,
  getNonAlienPlayerNumbersByRoleIdsWithNoShield,
  getPlayerNeighborsByToken,
} from '../../sceneUtils'
import { getAnyOtherPlayersByToken } from './bodysnatcher.utils'

export const bodysnatcherInteraction = (
  gamestate,
  token,
  title,
  randomBodysnatcherInstruction,
  bodysnatcherKey
) => {
  const newGamestate = { ...gamestate }

  if (newGamestate.players[token].shield) {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      shielded: true,
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_shielded'],
    })
  }

  let selectablePlayers
  let selectableCards
  let interactionMessage

  if (randomBodysnatcherInstruction === 'bodysnatcher_steal_text') {
    switch (bodysnatcherKey) {
      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text': {
        const evenOrOdd = bodysnatcherKey
          .replace('identifier_', '')
          .replace('_text', '')
          .replace('any', '')
        selectablePlayers = getAnyEvenOrOddPlayers(
          newGamestate.players,
          evenOrOdd
        )
        break
      }
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text':
      case 'identifier_oneneighbor_text': {
        const direction = bodysnatcherKey.includes('left')
          ? 'left'
          : bodysnatcherKey.includes('right')
            ? 'right'
            : 'both'
        selectablePlayers = getPlayerNeighborsByToken(
          newGamestate.players,
          direction,
          1
        )
        break
      }
      case 'identifier_any_text':
        selectablePlayers = getAnyOtherPlayersByToken(newGamestate.players)
        break
    }

    const selectablePlayerNumbers =
      getNonAlienPlayerNumbersByRoleIdsWithNoShield(selectablePlayers)

    selectableCards = {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 },
    }
    interactionMessage =
      selectablePlayerNumbers.length === 0
        ? 'interaction_no_selectable_player'
        : 'interaction_must_one_any_non_alien'
  } else if (randomBodysnatcherInstruction === 'bodysnatcher_center_text') {
    selectableCards = {
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: 1 },
    }
    interactionMessage = 'interaction_must_one_center'
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    ...selectableCards,
    obligatory: true,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: [interactionMessage],
    selectableCards,
    obligatory: true,
  })
}
