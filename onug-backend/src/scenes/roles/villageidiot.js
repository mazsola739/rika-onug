//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getPlayerNumbersWithMatchingTokens, moveCards } from '../../utils/scene-utils'
import { generateRoleInteraction } from './../generate-scene-role-interactions';

export const villageidiot = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['villageidiot_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 26 || (newGameState.players[token].card.player_role_id === 26 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 26 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = villageidiot_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const villageidiot_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    answer_options: ["left", "right"],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_may_direction'],
    icon: 'jest',
    uniqInformations: { answer_options: ["left", "right"] },
  })
}

export const villageidiot_response = (gameState, token, answer, title) => { //TODO validate answer?
  const newGameState = { ...gameState }
  const scene = []

  const currentPlayer = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const updatedPlayerCards = moveCards(newGameState.card_positions, answer, currentPlayer)

  newGameState.players[token].card_or_mark_action = true

  newGameState.card_positions = {
    ...newGameState.card_positions,
    ...updatedPlayerCards
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    card_or_mark_action: true,
    direction: answer,
  }

  const interaction = generateRoleInteraction(newGameState, token, {
    private_message: ["interaction_moved", answer === "left" ? "direction_left" : "direction_right"],
    icon: 'jest',
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
