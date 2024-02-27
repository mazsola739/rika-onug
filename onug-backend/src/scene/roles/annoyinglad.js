//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils/scene'
import { thing_interaction } from './thing'

export const annoyinglad = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['annoyinglad_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 55|| (newGameState.players[token].card.player_role_id === 55 && newGameState.players[token].card.player_original_id === 30) || (newGameState.players[token].card.player_role_id === 55 && newGameState.players[token].card.player_original_id === 64)) {
      interaction = thing_interaction(newGameState, token, title)
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
