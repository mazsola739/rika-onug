//@ts-check
import { SCENE, groobAndZerbIds } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

export const groobzerb = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_groobzerb_kickoff_text'
      : 'groobzerb_kickoff_text',
    'groobzerb_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (
      groobAndZerbIds.some(
        (id) => newGameState.players[token].card.player_role_id === id
      )
    ) {
      interaction = groobzerb_interaction(newGameState, token)
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

export const groobzerb_interaction = (gameState, token) => {
  return {}
}
export const groobzerb_response = (gameState, token, selected_positions) => {
  return {}
}
