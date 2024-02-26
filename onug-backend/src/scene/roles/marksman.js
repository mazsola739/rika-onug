//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'
import { isValidCardSelection } from '../validate-response-data'

export const marksman = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_marksman_kickoff_text'
      : 'marksman_kickoff_text',
    'marksman_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 35 || (newGameState.players[token].card.role_id === 35 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.role_id === 35 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = marksman_interaction(newGameState, token, title)
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

export const marksman_interaction = (gameState, token, title) => {
  return {}
}
export const marksman_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
