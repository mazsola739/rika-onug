//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getPlayerNumbersWithNonMatchingTokens } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'priest_kickoff2_text']

export const priest = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createPriest(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (prefix === 'priest') {
      if (newGameState.players[token].card.player_original_id === 37 || (newGameState.players[token].card.player_role_id === 37 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 37 && newGameState.players[token].card.player_original_id === 64)) {
        interaction = priest_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (newGameState.players[token].card.player_role_id === 37 && newGameState.players[token].card.player_original_id === 1) {
        interaction = priest_interaction(newGameState, token, title)
      }
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

  newGameState.players[token].card.player_mark = "mark_of_clarity"

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    card_or_mark_action: true,
    scene_title: title,
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
    mark_of_clarity: [currentPlayerNumber],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_one_any_other'],
    icon: 'clarity',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
    uniqInformations: { mark_of_clarity: [currentPlayerNumber] }
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
    private_message: ['interaction_mark_of_clarity', selected_mark_positions[0]],
    icon: 'clarity',
    uniqInformations: { mark_of_clarity: [currentPlayerNumber, selected_mark_positions[0]] },
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
