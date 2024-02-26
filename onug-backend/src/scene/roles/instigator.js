//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumbersWithMatchingTokens } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidMarkSelection } from '../validate-response-data'

export const instigator = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['instigator_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 34 || (newGameState.players[token].card.role_id === 34 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.role_id === 34 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = instigator_interaction(newGameState, token, title)
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

export const instigator_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const allPlayerTokens = getAllPlayerTokens(newGameState.players)
  const selectablePlayerNumbers = getPlayerNumbersWithMatchingTokens(newGameState.players, allPlayerTokens)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    selectable_marks: selectablePlayerNumbers,
    selectable_mark_limit: { mark: 1 },
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ["interaction_must_one_any"],
    icon: 'traitor',
    selectableMarks: { selectable_marks: selectablePlayerNumbers, selectable_mark_limit: { mark: 1 } },
  })
}
export const instigator_response = (gameState, token, selected_mark_positions, title) => {
  if (!isValidMarkSelection(selected_mark_positions, gameState.players[token].player_history)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  console.log(selected_mark_positions[0])

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

  
  const currentPlayerNumber = getPlayerNumbersWithMatchingTokens(newGameState.players, [token])

  if (currentPlayerNumber[0] === selected_mark_positions[0]) {
    newGameState.players[token].card.player_mark = "mark_of_traitor"
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    mark_of_traitor: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: [
      'interaction_traitor',
      selected_mark_positions[0],
    ],
    icon: 'traitor',
    uniqInformations: { mark_of_traitor: [selected_mark_positions[0]] },
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
