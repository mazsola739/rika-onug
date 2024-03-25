//@ts-check
import { copyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'
import { apprenticeseer_interaction } from './apprenticeseer'

export const rapscallion = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['rapscallion_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 65 || (card.player_role_id === 65 && copyPlayerIds.includes(card.player_original_id))) {
      interaction = apprenticeseer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
