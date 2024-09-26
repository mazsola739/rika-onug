import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getSceneEndTime, moveCardsButYourOwn } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'
import { isValidAnswerSelection } from '../validate-response-data'

export const villageidiot = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['villageidiot_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 26 || (card.player_role_id === 26 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = villageidiot_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const villageidiot_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    answer_options: ['left', 'right'],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_direction'],
    icon: title === 'RASCAL' ? 'prank' : 'jest',
    uniqueInformations: { answer_options: ['left', 'right'] },
  })
}

export const villageidiot_response = (gameState, token, selected_answer, title) => {
  if (!isValidAnswerSelection(selected_answer, gameState.players[token].player_history, title)) {
    return gameState
  }

  const newGameState = { ...gameState }
  const scene = []

  const currentPlayer = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const updatedPlayerCards = moveCardsButYourOwn(newGameState.card_positions, selected_answer, currentPlayer)

  newGameState.players[token].card_or_mark_action = true

  newGameState.card_positions = {
    ...newGameState.card_positions,
    ...updatedPlayerCards
  }

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    direction: selected_answer,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_moved', selected_answer === 'left' ? 'direction_left' : 'direction_right'],
    icon: title === 'RASCAL' ? 'prank' : 'jest',
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
