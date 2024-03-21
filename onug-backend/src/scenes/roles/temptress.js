//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getNonVillainPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidCardSelection } from '../validate-response-data'

export const temptress = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['temptress_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}
 
    const card = newGameState.players[token].card

    if (card.player_original_id === 69 || (card.player_role_id === 69 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = temptress_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const temptress_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const selectablePlayerNumbers = getNonVillainPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_one_any_non_villain'],
    icon: 'evilhand',
    selectableCards: { selectable_cards: selectablePlayerNumbers, selectable_card_limit: { player: 1, center: 0 } },
  })
}

export const temptress_response = (gameState, token, selected_card_positions, title) => {
  if (!isValidCardSelection(selected_card_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const centerVillain = { ...newGameState.card_positions.center_villain.card }
  const selectedCard = { ...newGameState.card_positions[selected_card_positions[0]].card }
  newGameState.card_positions.center_villain.card = selectedCard
  newGameState.card_positions[selected_card_positions[0]].card = centerVillain

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    swapped_cards: [selected_card_positions[0], 'center_villain'],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_swapped_cards', selected_card_positions[0], 'center_villain'],
    icon: 'evilhand',
    uniqInformations: { swapped_cards: [selected_card_positions[0], 'center_villain'], evilhand: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
