import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getPlayerNumberWithMatchingToken, getSceneEndTime, getTannerPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const apprenticetanner = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_apprenticetanner_kickoff_text'
      : 'apprenticetanner_kickoff_text',
    'apprenticetanner_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 71 || (card.player_role_id === 71 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = apprenticetanner_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const apprenticetanner_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  
  let tanner = getTannerPlayerNumbersByRoleIds(newGameState.players)

  const messageIdentifiers = formatPlayerIdentifier(tanner)
  let privateMessage = ['interaction_tanner', ...messageIdentifiers]

  if (tanner.length > 0) {
    newGameState.players[token].card.player_team = 'apprenticetanner'
  } else if (tanner.length === 0) {
    tanner = [getPlayerNumberWithMatchingToken(gameState.players, token)]
    newGameState.players[token].card.player_team = 'tanner'
    newGameState.players[token].card.player_role = 'TANNER'
    privateMessage = ['interaction_tanner_now']
  }

  newGameState.players[token].player_history[title] = {
    ...newGameState.players[token].player_history[title],
    tanner,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: privateMessage,
    icon: 'tanner',
    uniqueInformations: { tanner },
  })
}
