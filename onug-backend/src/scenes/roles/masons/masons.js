import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'

export const getMasonPlayerNumbersByRoleIds = players => {
  const result = []

  for (const token in players) {
    const player = players[token]
    if (IDS.MASONS.includes(player.card.player_role_id)) {
      result.push(`player_${player.player_number}`)
    }
  }

  return result
}

export const masons = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['masons_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (IDS.MASONS.some((id) => card.player_role_id === id && [id, ...IDS.ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = masonsInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const masonsInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const masons = getMasonPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    masons,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_masons'],
    icon: 'mason',
    uniqueInformations: { masons },
  })
}
