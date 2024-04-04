//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getPlayerNumbersWithNonMatchingTokens, getPlayerNumberWithMatchingToken, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

const createPriest = prefix => [`${prefix}_kickoff_text`, 'priest_kickoff2_text']

export const priest = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = createPriest(prefix)
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'priest') {
      if (card.player_original_id === 37 || (card.player_role_id === 37 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = priest_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (card.player_role_id === 37 && card.player_original_id === 1) {
        interaction = priest_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const priest_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const selectablePlayerNumbers = getPlayerNumbersWithNonMatchingTokens(newGameState.players, [token])

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerMark = newGameState.card_positions[currentPlayerNumber].mark

  if (gameState.players[token].card.player_original_id === 1) {
    const clarityOnePosition = newGameState.doppelganger_mark_positions.clarity_1
    newGameState.card_positions[currentPlayerNumber].mark = clarityOnePosition
    newGameState.doppelganger_mark_positions.clarity_1 = currentPlayerMark
  } else {
    const clarityOnePosition = newGameState.mark_positions.clarity_1
    newGameState.card_positions[currentPlayerNumber].mark = clarityOnePosition
    newGameState.mark_positions.clarity_1 = currentPlayerMark
  }

  newGameState.players[token].card.player_mark = 'mark_of_clarity'

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
    mark_of_clarity: [currentPlayerNumber],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'clarity',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    uniqueInformations: { mark_of_clarity: [currentPlayerNumber] }
  })
}

export const priest_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const selectedPositionMark = newGameState.card_positions[selected_mark_positions[0]].mark

  if (gameState.players[token].card.player_original_id === 1) {
    const clarityTwoPosition = newGameState.doppelganger_mark_positions.clarity_2
    newGameState.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    newGameState.doppelganger_mark_positions.clarity_2 = selectedPositionMark
  } else {
    const clarityTwoPosition = newGameState.mark_positions.clarity_2
    newGameState.card_positions[selected_mark_positions[0]].mark = clarityTwoPosition
    newGameState.mark_positions.clarity_2 = selectedPositionMark
  }

  newGameState.players[token].player_history.mark_of_clarity = [
    ...newGameState.players[token].player_history.mark_of_clarity, 
    selected_mark_positions[0]
  ]

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_clarity', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'clarity',
    uniqueInformations: { mark_of_clarity: [currentPlayerNumber, selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
