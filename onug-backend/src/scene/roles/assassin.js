//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

const createAssassin = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'assassin_kickoff2_text']

export const assassin = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createAssassin(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (prefix === 'assassin') {
      if (newGameState.players[token].card.player_original_id === 29 || (newGameState.players[token].card.player_role_id === 29 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 29 && newGameState.players[token].card.player_original_id === 64)) {
        interaction = assassin_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_assassin') {
      if (newGameState.players[token].card.player_role_id === 29 && newGameState.players[token].card.player_original_id === 1) {
        interaction = assassin_interaction(newGameState, token, title)
      }
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

export const assassin_interaction = (gameState, token, title) => {
  return {}
}
export const assassin_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
