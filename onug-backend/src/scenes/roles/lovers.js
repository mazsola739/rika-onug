//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'

export const lovers = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['lovers_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].player_mark === 'mark_of_love') {
      interaction = lover_interaction(newGameState, token, title)
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

export const lover_interaction = (gameState, token, title) => {
  return {}
}
