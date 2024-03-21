//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'

export const evilometer = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_evilometer_kickoff_text'
      : 'evilometer_kickoff_text',
    'evilometer_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 58 || (card.player_role_id === 58 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = evilometer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const evilometer_interaction = (gameState, token, title) => {
  return {}
}
