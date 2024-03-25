//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getRandomItemFromArray, getAllPlayerTokens } from '../../utils'

const randomBodysnatcher = [
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

//TODO fix bodysnatcher narration
const createBodysnatcher = prefix =>  [`${prefix}_kickoff_text`, getRandomItemFromArray(randomBodysnatcher), getRandomItemFromArray(bodysnatcherKeys), 'bodysnatcher_end_text']

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
        interaction = bodysnatcher_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_bodysnatcher') {
      if (card.player_role_id === 74 && card.player_original_id === 1) {
        interaction = bodysnatcher_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

// interaction_one_any_non_alien
/* export const alphawolf_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const selectablePlayerNumbers = getNonWerewolfPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_one_any_non_werewolf'],
    icon: 'claw',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
} */
/* export const drunk_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  if (!newGameState.players[token].shield) {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      selectable_cards: centerCardPositions,
      selectable_card_limit: { player: 0, center: 1 },
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_must_one_center'],
      icon: 'drunk',
      selectableCards: { selectable_cards: centerCardPositions, selectable_card_limit: { player: 0, center: 1 } },
    })
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
} */


export const bodysnatcher_interaction = (gameState, token, title) => {
  return {}
}

export const bodysnatcher_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
