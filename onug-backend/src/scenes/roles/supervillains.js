//@ts-check
import { supervillainIds, allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens } from '../../utils'

export const supervillains = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['supervillains_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (supervillainIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = supervillain_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const supervillain_interaction = (gameState, token, title) => {
  return {}
}
