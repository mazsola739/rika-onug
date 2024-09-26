import { SCENE } from '../../constant'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getMarksByPositions, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const everyonemark = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['everyone_mark_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    interaction = everyonemark_interaction(newGameState, token, title)

    newGameState.players[token].player_history[title].scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const everyonemark_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const viewMarks = getMarksByPositions(newGameState.card_positions, [currentPlayerNumber])

  newGameState.players[token].card.player_mark = newGameState.card_positions[currentPlayerNumber].mark

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    viewed_marks: [currentPlayerNumber]
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_own_mark'],
    icon: 'mark',
    showMarks: viewMarks,
  })
}
