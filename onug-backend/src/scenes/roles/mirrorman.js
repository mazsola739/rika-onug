//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'
import { copycat_interaction } from './copycat'

export const mirrorman = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['mirrorman_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 64) {
      interaction = copycat_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

