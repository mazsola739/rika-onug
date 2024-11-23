import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction, getAnyEvenOrOddPlayerNumbers, getNonAlienPlayerNumbersByRoleIdsWithNoShield, getPlayerNeighborsByToken } from '../../sceneUtils'
import { getAnyOtherPlayersByToken } from '../../sceneUtils/getAnyOtherPlayersByToken'

export const bodysnatcherAction = (gamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey) => {
  if (gamestate.players[token].shield) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      shielded: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_shielded']
    })
  }

  let selectablePlayers
  let selectableCards
  let interactionMessage
  let scene_end = false

  if (randomBodysnatcherInstruction === 'bodysnatcher_steal_text') {
    switch (bodysnatcherKey) {
      case 'identifier_anyeven_text':
      case 'identifier_anyodd_text': {
        const evenOrOdd = bodysnatcherKey.replace('identifier_', '').replace('_text', '').replace('any', '')
        selectablePlayers = getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd)
        break
      }
      case 'identifier_leftneighbor_text':
      case 'identifier_rightneighbor_text':
      case 'identifier_oneneighbor_text': {
        const direction = bodysnatcherKey.includes('left') ? 'left' : bodysnatcherKey.includes('right') ? 'right' : 'both'
        selectablePlayers = getPlayerNeighborsByToken(gamestate.players, token, direction, 1)
        break
      }
      case 'identifier_any_text':
        selectablePlayers = getAnyOtherPlayersByToken(gamestate.players)
        break
    }

    const selectablePlayerNumbers = getNonAlienPlayerNumbersByRoleIdsWithNoShield(selectablePlayers, gamestate.shielded_cards)

    selectableCards = {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    }
    interactionMessage = selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_must_one_any_non_alien'
    scene_end = selectablePlayerNumbers.length === 0
  } else if (randomBodysnatcherInstruction === 'bodysnatcher_center_text') {
    selectableCards = {
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: 1 }
    }
    interactionMessage = 'action_must_one_center'
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    ...selectableCards,
    obligatory: true,
    scene_end
  }

  return generateRoleAction(gamestate, token, {
    private_message: [interactionMessage],
    selectableCards,
    obligatory: true,
    scene_end
  })
}
