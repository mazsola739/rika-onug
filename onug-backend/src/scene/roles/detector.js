//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'
import { seer_interaction } from './seer'

export const detector = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['detector_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 56 || (newGameState.players[token].card.player_role_id === 56 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 56 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = seer_interaction(newGameState, token, title)
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
