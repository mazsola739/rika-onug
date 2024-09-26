import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNeighborsByToken, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { validateMarkSelection } from '../validate-response-data'

export const diseased = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['diseased_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 32 || (card.player_role_id === 32 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = diseasedInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const diseasedInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const neighbors = getPlayerNeighborsByToken(newGamestate.players, token)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: neighbors, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_neighbor'],
    icon: 'diseased',
    selectableCards: { selectable_marks: neighbors, selectable_mark_limit: { mark: 1 } },
  })
}

export const diseasedResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const diseasePosition = newGamestate.doppelganger_mark_positions.disease
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.disease = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = diseasePosition
  } else {
    const diseasePosition = newGamestate.mark_positions.disease
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.disease = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = diseasePosition
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_disease: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_disease', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'diseased',
    uniqueInformations: { mark_of_disease: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
