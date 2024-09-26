import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getPlayerNumbersWithMatchingTokens, getPlayerNumberWithMatchingToken, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const assassin = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [`${prefix}_kickoff_text`, 'assassin_kickoff2_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (prefix === 'assassin') {
      if (card.player_original_id === 29 || (card.player_role_id === 29 && copyPlayerIds.includes(card.player_original_id))) {
        interaction = assassin_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_assassin') {
      if (card.player_role_id === 29 && card.player_original_id === 1) {
        interaction = assassin_interaction(newGameState, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const assassin_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)

  const privateMessage = 
  
  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_must_one_any'],
    icon: 'target',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
  })
}

export const assassin_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history, title)) {
    return gameState
  }
  
  const newGameState = { ...gameState }
  const scene = []

  if (gameState.players[token].card.player_original_id === 1) {
    const assassinPosition = newGameState.doppelganger_mark_positions.assassin
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.doppelganger_mark_positions.assassin = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = assassinPosition
  } else {
    const assassinPosition = newGameState.mark_positions.assassin
    const selectedPosition = newGameState.card_positions[selected_mark_positions[0]].mark

    newGameState.mark_positions.assassin = selectedPosition
    newGameState.card_positions[selected_mark_positions[0]].mark = assassinPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    newGameState.players[token].card.player_mark = 'mark_of_assassin'
  }

  newGameState.players[token].card_or_mark_action = true

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    mark_of_assassin: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_assassin', formatPlayerIdentifier(selected_mark_positions)[0]],
    icon: 'target',
    uniqueInformations: { mark_of_assassin: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
