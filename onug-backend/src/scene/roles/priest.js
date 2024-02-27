//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

const createPriest = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'priest_kickoff2_text']

export const priest = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createPriest(prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (prefix === 'priest') {
      if (newGameState.players[token].card.player_original_id === 37 || (newGameState.players[token].card.player_role_id === 37 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 37 && newGameState.players[token].card.player_original_id === 64)) {
        interaction = priest_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_priest') {
      if (newGameState.players[token].card.player_role_id === 37 && newGameState.players[token].card.player_original_id === 1) {
        interaction = priest_interaction(newGameState, token, title)
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

export const priest_interaction = (gameState, token, title) => {
  return {}
}
export const priest_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
