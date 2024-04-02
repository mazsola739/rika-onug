//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, superVillainDetected } from '../../utils'
import { generateRoleInteraction } from './../generate-scene-role-interactions';

//TODO super villains can see evilometer
export const evilometer = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_evilometer_kickoff_text'
      : 'evilometer_kickoff_text',
    'evilometer_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 58 || (card.player_role_id === 58 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = evilometer_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const evilometer_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const neighborIsSuperVillain = superVillainDetected(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    super_villain_neighbor: neighborIsSuperVillain,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message:  [neighborIsSuperVillain ? 'interaction_got_tapped_by_villain' : 'interaction_no_tap'],
    icon: 'aerial',
    uniqueInformations: { super_villain_neighbor: neighborIsSuperVillain }
  })
}
