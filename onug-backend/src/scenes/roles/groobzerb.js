//@ts-check
import { groobzerbIds, allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getSceneEndTime, getZerbPlayerNumberByRoleIds, getGroobPlayerNumberByRoleIds, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const groobzerb = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_groobzerb_kickoff_text'
      : 'groobzerb_kickoff_text',
    'groobzerb_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (groobzerbIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = groobzerb_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene
  return newGameState
}

export const groobzerb_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const player = newGameState.players[token]

  const zerbPlayers = getZerbPlayerNumberByRoleIds(newGameState.players)
  const groobPlayers = getGroobPlayerNumberByRoleIds(newGameState.players)

  if (player.player_role_id === 47) {
    if (zerbPlayers.length >= 1) {
      newGameState.players[token].card.player_team = 'groob'
      groobPlayers.forEach(groob => newGameState.card_positions[groob].team = 'groob')

      player.player_history = { ...player.player_history, scene_title: title, zerb: zerbPlayers }

      const messageIdentifiers = formatPlayerIdentifier(zerbPlayers)

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        icon: 'groobzerb',
        uniqueInformations: { groobzerb: zerbPlayers },
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_no_zerb'],
        icon: 'groobzerb',
      })
    }
  } else if (player.player_role_id === 54) {
    if (groobPlayers.length >= 1) {
      newGameState.players[token].card.player_team = 'zerb'
      zerbPlayers.forEach(zerb => newGameState.card_positions[zerb].team = 'zerb')

      player.player_history = { ...player.player_history, scene_title: title, groob: groobPlayers }

      const messageIdentifiers = formatPlayerIdentifier(groobPlayers)

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        icon: 'groobzerb',
        uniqueInformations: { groobzerb: groobPlayers },
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }
      
      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_no_groob'],
        icon: 'groobzerb',
      })
    }
  }
}

