import { SCENE } from '../../constants'
import { getAllPlayerTokens, getPlayerNumberWithMatchingToken, getMarksByPositions, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const everyonemark = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['everyone_mark_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    interaction = everyonemark_interaction(newGamestate, token, title)

    newGamestate.players[token].player_history[title].scene_title = title
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const everyonemark_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const viewMarks = getMarksByPositions(newGamestate.card_positions, [currentPlayerNumber])

  newGamestate.players[token].card.player_mark = newGamestate.card_positions[currentPlayerNumber].mark

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_marks: [currentPlayerNumber]
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_own_mark'],
    icon: 'mark',
    showMarks: viewMarks,
  })
}
