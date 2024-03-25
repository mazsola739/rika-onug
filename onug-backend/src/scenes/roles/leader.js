//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAlienPlayerNumbersByRoleIds, getAllPlayerTokens, getGroobPlayerNumberByRoleIds, getZerbPlayerNumberByRoleIds } from '../../utils'
import { generateRoleInteraction } from './../generate-scene-role-interactions'

export const leader = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_leader_kickoff_text'
      : 'leader_kickoff_text',
    'leader_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 48 || (card.player_role_id === 48 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = leader_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const leader_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const aliens = getAlienPlayerNumbersByRoleIds(newGameState.players)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    aliens,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_aliens'],
    icon: 'alien',
    uniqInformations: { aliens },
  })
}

export const leader_zerbgroob = (gameState, title) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = ['leader_zerbgroob_text']

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 48 || (card.player_role_id === 48 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = leader_zerbgroob_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const leader_zerbgroob_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const zerb = getZerbPlayerNumberByRoleIds(newGameState.players)
  const groob = getGroobPlayerNumberByRoleIds(newGameState.players)

  if (groob.length >= 1 && zerb.length >= 1) {
    const zerbgroob = zerb.concat(groob)

    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
      zerbgroob,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_zerbgroob'],
      icon: 'groobzerb',
      uniqInformations: { zerbgroob },
    })
  } else {
    newGameState.players[token].player_history = {
      ...newGameState.players[token].player_history,
      scene_title: title,
    }

    return generateRoleInteraction(newGameState, token, {
      private_message: ['interaction_no_zerbgroob'],
      icon: 'groobzerb',
    })
  }
}
