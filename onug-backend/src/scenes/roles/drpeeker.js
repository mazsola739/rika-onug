//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'
import { mysticwolf_interaction } from './mysticwolf'

export const drpeeker = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['drpeeker_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 57 || (card.player_role_id === 57 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = mysticwolf_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
