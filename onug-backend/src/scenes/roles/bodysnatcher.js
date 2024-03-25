//@ts-check
import { centerCardPositions, copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens, getNonWerewolfPlayerNumbersByRoleIds, getAnyOtherPlayersByToken, getAnyEvenOrOddPlayers, getPlayerNeighborsByToken } from '../../utils'
import { generateRoleInteraction } from './../generate-scene-role-interactions'

const randomBodysnatcherInstructions = [
  'bodysnatcher_steal_text',
  'bodysnatcher_center_text',
]
const bodysnatcherKeys = [
  'identifier_any_text',
  'identifier_anyeven_text',
  'identifier_anyodd_text',
  'identifier_leftneighbor_text',
  'identifier_rightneighbor_text',
  'identifier_bothneighbors_text',
]

const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
const createBodysnatcher = prefix => {
  return [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']
}

export const bodysnatcher = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createBodysnatcher(prefix)

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'bodysnatcher') {
      if (card.player_original_id === 74 || (card.player_role_id === 74 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = bodysnatcher_interaction(newGameState, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    } else if (prefix === 'doppelganger_bodysnatcher') {
      if (card.player_role_id === 74 && card.player_original_id === 1) {
        interaction = bodysnatcher_interaction(newGameState, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const bodysnatcher_interaction = (gameState, token, title, randomBodysnatcherInstruction, bodysnatcherKey) => {
  const newGameState = { ...gameState }

  if (!newGameState.players[token].shield) {
    if (randomBodysnatcherInstruction === 'bodysnatcher_steal_text') {

      let selectablePlayers

      switch (bodysnatcherKey) {
        case 'identifier_anyeven_text':

          selectablePlayers = getAnyEvenOrOddPlayers(newGameState.players, "even")
          break
        case 'identifier_anyodd_text':

          selectablePlayers = getAnyEvenOrOddPlayers(newGameState.players, "odd")
          break
        case 'identifier_leftneighbor_text':

          selectablePlayers = getPlayerNeighborsByToken(newGameState.players, "left")
          break
        case 'identifier_rightneighbor_text':

          selectablePlayers = getPlayerNeighborsByToken(newGameState.players, "right")
          break
        case 'identifier_bothneighbors_text':

          selectablePlayers = getPlayerNeighborsByToken(newGameState.players, "both")
          break

        default:
          selectablePlayers = getAnyOtherPlayersByToken(newGameState.players)
          break
      }

      const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(selectablePlayers)

      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        scene_title: title,
        selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
      }
    
      return generateRoleInteraction(newGameState, token, {
        private_message: [selectablePlayerNumbers.length === 0 ? 'interaction_no_selectable_player' : 'interaction_one_any_non_alien'],
        icon: 'ufo',
        selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
      })

    } else if (randomBodysnatcherInstruction === 'bodysnatcher_center_text') {
      newGameState.players[token].player_history = {
        ...newGameState.players[token].player_history,
        scene_title: title,
        selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 },
      }
  
      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_must_one_center'],
        icon: 'ufo',
        selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } },
      })
    }
  } else {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      shielded: true,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_shielded'],
      icon: 'shield',
      uniqInformations: { shielded: true },
    })
  }
}

export const bodysnatcher_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
