//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { alienAbducted, getAllPlayerTokens, getPlayerNeighborsByToken, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

//TODO aliens can see cow
export const cow = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger 
      ? 'doppelganger_cow_kickoff_text' 
      : 'cow_kickoff_text',
    'cow_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 45 || (card.player_role_id === 45 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = cow_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const cow_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const neighborIsAlien = alienAbducted(newGameState.players, token)
  const neighbors = getPlayerNeighborsByToken(newGameState.players, 'both', 1)

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    alien_neighbor: neighborIsAlien ? neighbors : [],
  }

  return generateRoleInteraction(newGameState, token, {
    private_message:  [neighborIsAlien ? 'interaction_got_tapped_by_alien' : 'interaction_no_tap'],
    icon: 'cow',
    uniqueInformations: { alien_neighbor: neighborIsAlien ? neighbors : [], }
  })
}
