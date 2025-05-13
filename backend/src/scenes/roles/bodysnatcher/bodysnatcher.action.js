import { CENTER_CARD_POSITIONS } from '../../../constants'
import { generateRoleAction, getPlayerNeighborsByToken, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const bodysnatcherAction = (gamestate, token, title, prefix) => {
  if (gamestate.players[token].shield) {
    return generateRoleAction(gamestate, token, title, {
      private_message: ['action_shielded']
    })
  }

  const randomBodysnatcherInstruction = gamestate.roles[prefix].instruction
  const bodysnatcherKey = gamestate.roles[prefix].key

  let selectablePlayers
  let selectable_cards = []
  let selectable_card_limit = { player: 1, center: 0 }
  let interactionMessage
  let scene_end = false
  let obligatory = true

  if (randomBodysnatcherInstruction === 'bodysnatcher_steal') {
    switch (bodysnatcherKey) {
      case 'identifier_anyeven':
      case 'identifier_anyodd': {
        const evenOrOdd = bodysnatcherKey.replace('identifier_', '').replace('any', '')
        selectable_cards = getPlayerNumbersByGivenConditions(gamestate, `nonAlienWithoutShield${evenOrOdd}`, token)
        break
      }
      case 'identifier_leftneighbor':
      case 'identifier_rightneighbor':
      case 'identifier_oneneighbor': {
        const direction = bodysnatcherKey.includes('left') ? 'left' : bodysnatcherKey.includes('right') ? 'right' : 'both'
        const aliens = getPlayerNumbersByGivenConditions(gamestate, 'alien')
        const neighbors = getPlayerNeighborsByToken(gamestate.players, token, direction, 1)
        selectable_cards = neighbors.filter(neighbor => !aliens.includes(neighbor))
        break
      }
      case 'identifier_any':
        selectable_cards = getPlayerNumbersByGivenConditions(selectablePlayers, 'nonAlienWithoutShield')
        break
    }

    interactionMessage = selectable_cards.length === 0 ? 'action_no_selectable_player' : 'action_must_one_any_non_alien'
    scene_end = selectable_cards.length === 0
    obligatory = false
  } else if (randomBodysnatcherInstruction === 'bodysnatcher_center') {
    selectable_cards = CENTER_CARD_POSITIONS
    selectable_card_limit = { player: 0, center: 1 }
    interactionMessage = 'action_must_one_center'
  }

  return generateRoleAction(gamestate, token, title, {
    private_message: [interactionMessage],
    selectableCards: { selectable_cards, selectable_card_limit },
    obligatory,
    scene_end
  })
}
