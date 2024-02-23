//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getTannerNumberByRoleIds } from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const apprenticetanner = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const narration = [
    hasDoppelganger
      ? 'doppelganger_apprenticetanner_kickoff_text'
      : 'apprenticetanner_kickoff_text',
    'apprenticetanner_kickoff2_text',
  ]
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].card.player_original_id === 71) {
      interaction = apprenticetanner_interaction(newGameState, token, title)
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

export const apprenticetanner_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const tanner = getTannerNumberByRoleIds(newGameState.players)

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
