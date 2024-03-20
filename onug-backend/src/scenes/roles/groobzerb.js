//@ts-check
import { SCENE, groobAndZerbIds } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'

export const groobzerb = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_groobzerb_kickoff_text'
      : 'groobzerb_kickoff_text',
    'groobzerb_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    if (groobAndZerbIds.some((id) => newGameState.players[token].card.player_role_id === id)) {
      interaction = groobzerb_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const groobzerb_interaction = (gameState, token, title) => {
  return {}
}

export const groobzerb_response = (gameState, token, selected_card_positions, title) => {
  const newGameState = { ...gameState }
  const scene = []
  
  const interaction = {}
  scene.push({ type: SCENE, title, token, interaction })
  newGameState.scene = scene

  return newGameState
}
