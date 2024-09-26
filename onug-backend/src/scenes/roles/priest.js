import { COPY_PLAYER_IDS, SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens, getPlayerNumberWithMatchingToken, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const priest = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`, 'priest_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'priest') {
      if (card.player_original_id === 37 || (card.player_role_id === 37 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = priest_interaction(newGamestate, token, title)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (card.player_role_id === 37 && card.player_original_id === 1) {
        interaction = priest_interaction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const priest_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGamestate.players, [token])

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerMark = newGamestate.card_positions[currentPlayerNumber].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const clarityOnePosition = newGamestate.doppelganger_mark_positions.clarity_1
    newGamestate.card_positions[currentPlayerNumber].mark = clarityOnePosition
    newGamestate.doppelganger_mark_positions.clarity_1 = currentPlayerMark
  } else {
    const clarityOnePosition = newGamestate.mark_positions.clarity_1
    newGamestate.card_positions[currentPlayerNumber].mark = clarityOnePosition
    newGamestate.mark_positions.clarity_1 = currentPlayerMark
  }

  newGamestate.players[token].card.player_mark = 'mark_of_clarity'

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
    mark_of_clarity: [currentPlayerNumber],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'clarity',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { mark_of_clarity: [currentPlayerNumber] }
  })
}

export const priest_response = (gamestate, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const selectedPositionMark = newGamestate.card_positions[selected_mark_positions[0]].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const clarityTwoPosition = newGamestate.doppelganger_mark_positions.clarity_2
    newGamestate.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    newGamestate.doppelganger_mark_positions.clarity_2 = selectedPositionMark
  } else {
    const clarityTwoPosition = newGamestate.mark_positions.clarity_2
    newGamestate.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    newGamestate.mark_positions.clarity_2 = selectedPositionMark
  }

  newGamestate.players[token].player_history[title].mark_of_clarity = [
    ...newGamestate.players[token].player_history[title].mark_of_clarity, 
    selected_mark_positions[0]
  ]

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_clarity', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'clarity',
    uniqueInformations: { mark_of_clarity: [currentPlayerNumber, selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
