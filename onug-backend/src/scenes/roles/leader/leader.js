import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { formatPlayerIdentifier, getAlienPlayerNumbersByRoleIds, getAllPlayerTokens, getGroobPlayerNumberByRoleIds, getSceneEndTime, getZerbPlayerNumberByRoleIds } from '../../../utils'
import { generateRoleInteraction } from '../../generate-scene-role-interactions'

export const leader = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_leader_kickoff_text'
      : 'leader_kickoff_text',
    'leader_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 48 || (card.player_role_id === 48 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = leaderInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const leaderInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const aliens = getAlienPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    aliens,
  }

  const messageIdentifiers = formatPlayerIdentifier(aliens)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_aliens', ...messageIdentifiers],
    icon: 'alien',
    uniqueInformations: { aliens },
  })
}

export const leader_zerbgroob = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['leader_zerbgroob_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 48 || (card.player_role_id === 48 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = leader_zerbgroobInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const leader_zerbgroobInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const zerb = getZerbPlayerNumberByRoleIds(newGamestate.players)
  const groob = getGroobPlayerNumberByRoleIds(newGamestate.players)

  if (groob.length >= 1 && zerb.length >= 1) {
    const zerbgroob = zerb.concat(groob)

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      groobzerb: zerbgroob,
    }

    const messageIdentifiers = formatPlayerIdentifier(zerbgroob)

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_zerbgroob', ...messageIdentifiers],
      icon: 'groobzerb',
      uniqueInformations: { groobzerb: zerbgroob },
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_no_zerbgroob'],
      icon: 'groobzerb',
    })
  }
}
