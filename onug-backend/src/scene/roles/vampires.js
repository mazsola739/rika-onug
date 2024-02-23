//@ts-check
import { SCENE, vampireIds } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const vampires = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['vampires_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (
      vampireIds.some(
        (id) => newGameState.players[token].card.player_role_id === id
      )
    ) {
      interaction = vampires_interaction(newGameState, token, title)
    }

          newGameState.players[token].player_history.scene_title = title
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

export const vampires_interaction = (gameState, token, title) => {
  return {}
}
export const vampires_response = (gameState, token, selected_positions, title) => {
  return {}
}
