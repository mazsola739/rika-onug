//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const cow = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger ? 'doppelganger_cow_kickoff_text' : 'cow_kickoff_text',
    'cow_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (
      newGameState.players[token].card.player_original_id === 45 ||
      (newGameState.players[token].card.role_id === 45 &&
        newGameState.players[token].card.player_original_id === 1)
    ) {
      interaction = cow_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })

    newGameState.scene = scene
  })

  return newGameState
}

export const cow_interaction = (gameState, token) => {
  return {}
}
