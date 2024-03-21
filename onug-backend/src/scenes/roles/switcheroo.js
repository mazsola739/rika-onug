//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'
import { troublemaker_interaction } from './troublemaker'

export const switcheroo = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['switcheroo_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 68 || (card.player_role_id === 68 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = troublemaker_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
