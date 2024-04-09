//@ts-check
import { masonIds, allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getMasonPlayerNumbersByRoleIds, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const masons = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['masons_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (masonIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = masons_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const masons_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const masons = getMasonPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    masons,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_masons'],
    icon: 'mason',
    uniqueInformations: { masons },
  })
}
