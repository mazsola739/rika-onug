//@ts-check
import { SCENE } from '../../constant'
import { getAllPlayerTokens, getLoversPlayerNumbersByMark } from '../../utils/scene-utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const lovers = (gameState, title) => {
  const newGameState = { ...gameState }
  const narration = ['lovers_kickoff_text']
  const tokens = getAllPlayerTokens(newGameState.players)
  const scene = []

  tokens.forEach((token) => {
    let interaction = {}

    if (newGameState.players[token].player_mark === 'mark_of_love') {
      interaction = lover_interaction(newGameState, token, title)
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

export const lover_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const lovers = getLoversPlayerNumbersByMark(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    lovers: lovers,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_lover'],
    icon: 'lover',
    uniqInformations: { lovers: lovers },
  })
}
