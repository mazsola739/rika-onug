//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'

export const leader = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_leader_kickoff_text'
      : 'leader_kickoff_text',
    'leader_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 48 || (card.player_role_id === 48 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = leader_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const leader_interaction = (gameState, token, title) => {
  return {}
}

export const leader_zerbgroob = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['leader_zerbgroob_text']

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 48) {
      interaction = leader_zerbgroob_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const leader_zerbgroob_interaction = (gameState, token, title) => {
  return {}
}
