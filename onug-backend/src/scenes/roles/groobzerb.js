//@ts-check
import { groobzerbIds, allCopyPlayerIds, SCENE } from '../../constant'
import { formatPlayerIdentifier, getAllPlayerTokens, getGroobPlayerNumberByRoleIds, getZerbPlayerNumberByRoleIds } from '../../utils'
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

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (groobzerbIds.some((id) => card.player_role_id === id && [id, ...allCopyPlayerIds].includes(card.player_original_id))) {
      interaction = groobzerb_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const groobzerb_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const player = newGameState.players[token]

  if (player.player_role_id === 47) {
    const zerb = getZerbPlayerNumberByRoleIds(newGameState.players)

    if (zerb.length >= 1) {
      player.player_history = { ...player.player_history, scene_title: title, zerb }

      const messageIdentifiers = formatPlayerIdentifier(zerb)

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        icon: 'groobzerb',
        uniqInformations: { zerb },
      })
    } else {
      player.player_history = { ...player.player_history, scene_title: title }

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_no_zerb'],
        icon: 'groobzerb',
      })
    }
  } else if (player.player_role_id === 54) {
    const groob = getGroobPlayerNumberByRoleIds(newGameState.players)

    if (groob.length >= 1) {
      player.player_history = { ...player.player_history, scene_title: title, groob }

      const messageIdentifiers = formatPlayerIdentifier(groob)

      return generateRoleInteraction(newGameState, token, {
        private_message: ['interaction_zerbgroob', ...messageIdentifiers],
        icon: 'groobzerb',
        uniqInformations: { groob },
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

