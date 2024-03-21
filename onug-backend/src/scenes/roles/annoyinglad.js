//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'
import { thing_interaction } from './thing'

export const annoyinglad = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['annoyinglad_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 55 || (card.player_role_id === 55 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = thing_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
