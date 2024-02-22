//@ts-check
import { SCENE, superVillainsIds } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const supervillains = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['supervillains_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  tokens.forEach((token) => {
    const scene = []
    let interaction = {}

    if (
      superVillainsIds.some(
        (id) => newGameState.players[token].card.player_role_id === id
      )
    ) {
      interaction = supervillain_interaction(newGameState, token)
    }

    scene.push({
      type: SCENE,
      title,
      token,
      narration,
      interaction,
    })

    newGameState.scene = scene
  })

  return newGameState
}

export const supervillain_interaction = (gameState, token) => {
  return {}
}
export const supervillain_response = (gameState, token, selected_positions) => {
  return {}
}
