//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'
import { robber_interaction } from './robber'

export const roleretriever = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['roleretriever_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 66 || (newGameState.players[token].card.player_role_id === 66 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 66 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = robber_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
