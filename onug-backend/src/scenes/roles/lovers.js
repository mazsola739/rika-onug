import { SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getLoversPlayerNumbersByMark, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const lovers = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['lovers_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const player = newGamestate.players[token]

    if (player.player_mark === 'mark_of_love') {
      interaction = loverInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const loverInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const lovers = getLoversPlayerNumbersByMark(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    lovers,
  }

  const messageIdentifiers = formatPlayerIdentifier(lovers)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_lover', ...messageIdentifiers],
    icon: 'lover',
    uniqueInformations: { lovers },
  })
}
