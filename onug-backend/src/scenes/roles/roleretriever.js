//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'
import { robber_interaction } from './robber'

export const roleretriever = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['roleretriever_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 66 || (card.player_role_id === 66 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = robber_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}
