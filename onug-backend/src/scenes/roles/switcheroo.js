//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'
import { troublemaker_interaction } from './troublemaker'

export const switcheroo = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['switcheroo_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 68 || (newGameState.players[token].card.player_role_id === 68 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 68 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = troublemaker_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
