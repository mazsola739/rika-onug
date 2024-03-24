//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getTannerPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const apprenticetanner = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_apprenticetanner_kickoff_text'
      : 'apprenticetanner_kickoff_text',
    'apprenticetanner_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 71 || (card.player_role_id === 71 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = apprenticetanner_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const apprenticetanner_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const tanner = getTannerPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    tanner: tanner,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_tanner'],
    icon: 'tanner',
    uniqInformations: { tanner: tanner },
  })
}
