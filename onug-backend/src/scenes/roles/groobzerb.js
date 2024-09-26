import { GROOB_AND_ZERB_IDS, ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getSceneEndTime, getZerbPlayerNumberByRoleIds, getGroobPlayerNumberByRoleIds, formatPlayerIdentifier } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const groobzerb = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_groobzerb_kickoff_text'
      : 'groobzerb_kickoff_text',
    'groobzerb_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (GROOB_AND_ZERB_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = groobzerbInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const groobzerbInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const player = newGamestate.players[token]

  const zerbPlayers = getZerbPlayerNumberByRoleIds(newGamestate.players)
  const groobPlayers = getGroobPlayerNumberByRoleIds(newGamestate.players)

  if (player.player_role_id === 47) {
    if (zerbPlayers.length >= 1) {
      newGamestate.players[token].card.player_team = 'groob'
      groobPlayers.forEach(groob => newGamestate.card_positions[groob].team = 'groob')

      player.player_history[title] = { ...player.player_history[title], zerb: zerbPlayers }

      const messageIdentifiers = formatPlayerIdentifier(zerbPlayers)

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        icon: 'groobzerb',
        uniqueInformations: { groobzerb: zerbPlayers },
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_no_zerb'],
        icon: 'groobzerb',
      })
    }
  } else if (player.player_role_id === 54) {
    if (groobPlayers.length >= 1) {
      newGamestate.players[token].card.player_team = 'zerb'
      zerbPlayers.forEach(zerb => newGamestate.card_positions[zerb].team = 'zerb')

      player.player_history[title] = { ...player.player_history[title], groob: groobPlayers }

      const messageIdentifiers = formatPlayerIdentifier(groobPlayers)

      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        icon: 'groobzerb',
        uniqueInformations: { groobzerb: groobPlayers },
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }
      
      return generateRoleInteraction(newGamestate, token, {
        private_message: ['interaction_no_groob'],
        icon: 'groobzerb',
      })
    }
  }
}

