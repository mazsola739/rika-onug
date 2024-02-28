//@ts-check
import { SCENE, masonIds } from '../../constant'
import { getAllPlayerTokens, getMasonPlayerNumbersByRoleIds } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const masons = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['masons_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (masonIds.some((id) => newGameState.players[token].card.player_role_id === id)) {
      interaction = masons_interaction(newGameState, token, title)
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

export const masons_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const masons = getMasonPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    masons: masons,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_masons'],
    icon: 'mason',
    uniqInformations: { masons: masons },
  })
}
