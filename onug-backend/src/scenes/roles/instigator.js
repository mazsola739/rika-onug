import { COPY_PLAYER_IDS, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const instigator = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['instigator_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 34 || (card.player_role_id === 34 && COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = instigator_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const instigator_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_any'],
    icon: 'traitor',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
  })
}

export const instigator_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history, title)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  if (gameState.players[token].card.player_original_id === 1) {
    const traitorPosition = newGameState.doppelganger_mark_positions.traitor
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.doppelganger_mark_positions.traitor = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = traitorPosition
  } else {
    const traitorPosition = newGameState.mark_positions.traitor
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.mark_positions.traitor = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = traitorPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    newGameState.players[token].card.player_mark = 'mark_of_traitor'
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    mark_of_traitor: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_traitor', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'traitor',
    uniqueInformations: { mark_of_traitor: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
