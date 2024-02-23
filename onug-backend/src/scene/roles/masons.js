//@ts-check
import { SCENE, masonIds } from '../../constant'
import {
  getAllPlayerTokens,
  getPlayerNumbersWithMatchingTokens,
} from '../../utils/scene'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const masons = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['masons_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)

  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (
      masonIds.some(
        (id) => newGameState.players[token].card.player_role_id === id
      )
    ) {
      interaction = masons_interaction(newGameState, token)
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

export const masons_interaction = (gameState, token) => {
  const newGameState = { ...gameState }

  const masons = getPlayerNumbersWithMatchingTokens(newGameState.players, [
    token,
  ])

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    masons: masons,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_masons'],
    icon: 'mason',
    uniqInformations: { masons: masons },
  })
}
