//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'
import { witch_interaction } from './witch'

export const voodoolou = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['voodoolou_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 70 || (newGameState.players[token].card.player_role_id === 70 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 70 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = witch_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
