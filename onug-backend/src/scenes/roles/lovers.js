import { SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getLoversPlayerNumbersByMark, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const lovers = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['lovers_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const player = newGameState.players[token]

    if (player.player_mark === 'mark_of_love') {
      interaction = lover_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const lover_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const lovers = getLoversPlayerNumbersByMark(newGameState.players)

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    lovers,
  }

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_mark_of_lover', ...messageIdentifiers],
    icon: 'lover',
    uniqueInformations: { lovers },
  })
}
