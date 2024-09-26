import { ALL_SUPER_VILLAIN_IDS, ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { formatPlayerIdentifier, getAllPlayerTokens, getSceneEndTime, getVillainPlayerNumbersByRoleIds } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

export const supervillains = (gamestate, title) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = ['supervillains_kickoff_text']
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (ALL_SUPER_VILLAIN_IDS.some((id) => card.player_role_id === id && [id, ...ALL_COPY_PLAYER_IDS].includes(card.player_original_id))) {
      interaction = supervillain_interaction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const supervillain_interaction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const villains = getVillainPlayerNumbersByRoleIds(newGamestate.players)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    villains,
  }

  const messageIdentifiers = formatPlayerIdentifier(villains)

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_villains', ...messageIdentifiers],
    icon: 'villain',
    uniqueInformations: { villains },
  })
}
