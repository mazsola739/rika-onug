//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

const createTheCount = (prefix) => () =>
  [`${prefix}_kickoff_text`, 'thecount_kickoff2_text']

export const thecount = (gameState, title, prefix) => {
  const newGameState = { ...gameState }
  const narration = createTheCount(prefix)

  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (prefix === 'thecount') {
      if (newGameState.players[token].card.player_original_id === 39 || (newGameState.players[token].card.role_id === 39 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.role_id === 39 && newGameState.players[token].card.player_original_id === 64)) {
        interaction = thecount_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_thecount') {
      if (newGameState.players[token].card.role_id === 39 && newGameState.players[token].card.player_original_id === 1) {
        interaction = thecount_interaction(newGameState, token, title)
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

export const thecount_interaction = (gameState, token, title) => {
  return {}
}
export const thecount_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
