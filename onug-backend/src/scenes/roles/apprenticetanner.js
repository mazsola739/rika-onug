import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getPlayerNumberWithMatchingToken, getSceneEndTime, getTannerPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const apprenticetanner = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_apprenticetanner_kickoff_text'
      : 'apprenticetanner_kickoff_text',
    'apprenticetanner_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 71 || (card.player_role_id === 71 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = apprenticetannerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const apprenticetannerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  let tanner = getTannerPlayerNumbersByRoleIds(newGamestate.players)

  const messageIdentifiers = formatPlayerIdentifier(tanner)
  let privateMessage = ['interaction_tanner', ...messageIdentifiers]

  if (tanner.length > 0) {
    newGamestate.players[token].card.player_team = 'apprenticetanner'
  } else if (tanner.length === 0) {
    tanner = [getPlayerNumberWithMatchingToken(gamestate.players, token)]
    newGamestate.players[token].card.player_team = 'tanner'
    newGamestate.players[token].card.player_role = 'TANNER'
    privateMessage = ['interaction_tanner_now']
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    tanner,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    icon: 'tanner',
    uniqueInformations: { tanner },
  })
}
