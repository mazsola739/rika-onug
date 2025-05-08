import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction, getAnyEvenOrOddPlayerNumbers, getPlayerNeighborsByToken, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const bodysnatcherAction = (gamestate, token, title, prefix) => {
  if (gamestate.players[token].shield) {
    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      shielded: true
    }

    return generateRoleAction(gamestate, token, {
      private_message: ['action_shielded']
    })
  }

  const randomBodysnatcherInstruction = gamestate.roles[prefix].instruction
  const bodysnatcherKey = gamestate.roles[prefix].key

  let selectablePlayers
  let selectableCards
  let interactionMessage
  let scene_end = false

  if (randomBodysnatcherInstruction === 'bodysnatcher_steal') {
    const getAnyOtherPlayersByToken = (players, token) => {
      const result = {}

      for (const player in players) {
        if (player !== token) {
          result[player] = players[player]
        }
      }

      return result
    }

    switch (bodysnatcherKey) {
      case 'identifier_anyeven':
      case 'identifier_anyodd': {
        const evenOrOdd = bodysnatcherKey.replace('identifier_', '').replace('any', '')
        selectablePlayers = getAnyEvenOrOddPlayerNumbers(gamestate.players, evenOrOdd)
        break
      }
      case 'identifier_leftneighbor':
      case 'identifier_rightneighbor':
      case 'identifier_oneneighbor': {
        const direction = bodysnatcherKey.includes('left') ? 'left' : bodysnatcherKey.includes('right') ? 'right' : 'both'
        selectablePlayers = getPlayerNeighborsByToken(gamestate.players, token, direction, 1)
        break
      }
      case 'identifier_any':
        selectablePlayers = getAnyOtherPlayersByToken(gamestate.players)
        break
    }

    const selectablePlayerNumbers = getPlayerNumbersByGivenConditions(selectablePlayers, 'nonAlienWithoutShield', gamestate.positions.shielded_cards)

    selectableCards = {
      selectable_cards: selectablePlayerNumbers,
      selectable_card_limit: { player: 1, center: 0 }
    }
    interactionMessage = selectablePlayerNumbers.length === 0 ? 'action_no_selectable_player' : 'action_must_one_any_non_alien'
    scene_end = selectablePlayerNumbers.length === 0
  } else if (randomBodysnatcherInstruction === 'bodysnatcher_center') {
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
