//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNeighborsByToken } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const diseased = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['diseased_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 32 || (newGameState.players[token].card.player_role_id === 32 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 32 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = diseased_interaction(newGameState, token, title)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })
  })

  newGameState.scene = scene
  return newGameState
}

export const diseased_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const neighbors = getPlayerNeighborsByToken(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: neighbors,
    selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_neighbor'],
    icon: 'diseased',
    selectableCards: { selectable_marks: neighbors, selectable_mark_limit: { mark: 1 } },
  })
}

export const diseased_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  if (gameState.players[token].card.player_original_id === 1) {
    const diseasePosition = newGameState.doppelganger_mark_positions.disease
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.doppelganger_mark_positions.disease = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = diseasePosition
  } else {
    const diseasePosition = newGameState.mark_positions.disease
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.mark_positions.diseased = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = diseasePosition
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    mark_of_disease: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_diseased', selected_mark_positions[0]],
    icon: 'diseased',
    uniqInformations: { mark_of_disease: [selected_mark_positions[0]] },
  })

  scene.push({
    type: SCENE,
    title,
    token,
    interaction,
  })
  newGameState.scene = scene

  return newGameState
}
