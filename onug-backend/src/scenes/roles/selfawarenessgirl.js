//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'
import { insomniac_interaction } from './insomniac'

export const selfawarenessgirl = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_selfawarenessgirl_kickoff_text'
      : 'selfawarenessgirl_kickoff_text',
    'selfawarenessgirl_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 67 || (card.player_role_id === 67 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = insomniac_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
