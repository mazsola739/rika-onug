//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const everyonemark = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['everyone_mark_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    interaction = everyonemark_interaction(newGameState, token)

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

export const everyonemark_interaction = (gameState, token) => {
  return {}
}
