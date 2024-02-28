//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene-utils'

export const nostradamus = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['nostradamus_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 80  || (newGameState.players[token].card.player_role_id === 80 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 80 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = nostradamus_interaction(newGameState, token, title)
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

export const nostradamus_interaction = (gameState, token, title) => {
  return {}
}
export const nostradamus_response = (gameState, token, selected_card_positions, title) => {
  return {}
} //newGameState.nostradamus_team = ?

export const nostradamus_reaction = (gameState, title) => {
  const newGameState = { ...gameState }
  const nostradamusTeam = newGameState.nostradamus_team
  const narration = [
    'nostradamus_teamstart_text',
    `nostradamus_team_${nostradamusTeam}_text`,
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

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
