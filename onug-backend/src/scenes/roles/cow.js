//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'

export const cow = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? 'doppelganger_cow_kickoff_text' : 'cow_kickoff_text',
    'cow_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 45 || (newGameState.players[token].card.player_role_id === 45 && newGameState.players[token].card.player_original_id === 1) || (newGameState.players[token].card.player_role_id === 45 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 45 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = cow_interaction(newGameState, token, title)
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

export const cow_interaction = (gameState, token, title) => {
  return {}
}
