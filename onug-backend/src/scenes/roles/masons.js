//@ts-check
import { masonIds, allCopyPlayerIds, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getMasonPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const masons = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['masons_kickoff_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (masonIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = masons_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
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

  const messageIdentifiers = formatPlayerIdentifier(masons)

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_masons', ...messageIdentifiers],
    icon: 'mason',
    uniqInformations: { masons: masons },
  })
}
