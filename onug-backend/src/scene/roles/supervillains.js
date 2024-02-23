//@ts-check
import { SCENE, superVillainsIds } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const supervillains = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['supervillains_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (
      superVillainsIds.some(
        (id) => newGameState.players[token].card.player_role_id === id
      )
    ) {
      interaction = supervillain_interaction(newGameState, token, title)
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

export const supervillain_interaction = (gameState, token, title) => {
  return {}
}
export const supervillain_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
