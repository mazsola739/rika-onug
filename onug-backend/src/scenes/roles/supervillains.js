//@ts-check
import { supervillainIds, allCopyPlayerIds, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getSceneEndTime, getVillainPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const supervillains = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['supervillains_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (supervillainIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = supervillain_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const supervillain_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const villains = getVillainPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    villains,
  }

  const messageIdentifiers = formatPlayerIdentifier(villains)

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_villains', ...messageIdentifiers],
    icon: 'villain',
    uniqInformations: { villains },
  })
}
