import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime, getNonVampirePlayerNumbersByRoleIds, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const thecount = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'thecount') {
      if (card.player_original_id === 39 || (card.player_role_id === 39 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = thecount_interaction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_thecount') {
      if (card.player_role_id === 39 && card.player_original_id === 1) {
        interaction = thecount_interaction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const thecount_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_must_one_any_non_vampire'],
    icon: 'thecount',
    selectableCards: { selectable_marks: nonVampires, selectable_mark_limit: { mark: 1 } },
  })
}

export const thecount_response = (gamestate, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const fearPosition = newGamestate.doppelganger_mark_positions.fear
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.fear = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = fearPosition
  } else {
    const fearPosition = newGamestate.mark_positions.fear
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.fear = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = fearPosition
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_fear: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_fear', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'thecount',
    uniqueInformations: { mark_of_fear: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
