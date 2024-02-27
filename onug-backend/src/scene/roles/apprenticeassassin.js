//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'

const createApprenticeAssassin = (hasAssassin, prefix) => [
  `${prefix}_kickoff_text`,
  hasAssassin
    ? 'apprenticeassassin_assassin_text'
    : 'apprenticeassassin_alone_text',
]

export const apprenticeassassin = (gameState, title, hasAssassin, prefix) => {
  const newGameState = { ...gameState }
  const narration = createApprenticeAssassin(hasAssassin, prefix)
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (prefix === 'assassin') {
      if (newGameState.players[token].card.player_original_id === 28 || (newGameState.players[token].card.player_role_id === 28 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 28 && newGameState.players[token].card.player_original_id === 64)) {
        interaction = apprenticeassassin_interaction(newGameState, token, title)
      }
    } else if (prefix === 'doppelganger_assassin') {
      if (newGameState.players[token].card.player_role_id === 28 && newGameState.players[token].card.player_original_id === 1) {
        interaction = apprenticeassassin_interaction(newGameState, token, title)
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

export const apprenticeassassin_interaction = (gameState, token, title) => {
  return {}
}
export const apprenticeassassin_response = (gameState, token, selected_card_positions, title) => {
  return {}
}
