//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getNonVampirePlayerNumbersByRoleIds, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const thecount = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'thecount') {
      if (card.player_original_id === 39 || (card.player_role_id === 39 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = thecount_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_thecount') {
      if (card.player_role_id === 39 && card.player_original_id === 1) {
        interaction = thecount_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const thecount_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGameState)

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_any_non_vampire'],
    icon: 'thecount',
    selectableCards: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
  })
}

export const thecount_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history, title)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  if (gameState.players[token].card.player_original_id === 1) {
    const fearPosition = newGameState.doppelganger_mark_positions.fear
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.doppelganger_mark_positions.fear = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = fearPosition
  } else {
    const fearPosition = newGameState.mark_positions.fear
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.mark_positions.fear = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = fearPosition
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    mark_of_fear: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_fear', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'thecount',
    uniqueInformations: { mark_of_fear: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
