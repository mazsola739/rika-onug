import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getPlayerNeighborsByToken, getSceneEndTime, superVillainDetected } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction';

export const superVillainDetected = (players, evilometerToken) => {
  const evilometerNeighbors = getNeighborPlayerNumbersByToken(players, evilometerToken)
  const superVillains = getVillainPlayerNumbersByRoleIds(players)

  for (let villain of superVillains) {
    if (evilometerNeighbors.includes(villain)) {
      return true
    }
  }

  return false
}

//TODO super villains can see evilometer
export const evilometer = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_evilometer_kickoff_text'
      : 'evilometer_kickoff_text',
    'evilometer_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 58 || (card.player_role_id === 58 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = evilometerInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const evilometerInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const neighborIsSuperVillain = superVillainDetected(newGamestate.players, token)
  const neighbors = getPlayerNeighborsByToken(newGamestate.players, 'both', 1)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    villain_neighbor: neighborIsSuperVillain ? neighbors : [],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message:  [neighborIsSuperVillain ? 'interaction_got_tapped_by_villain' : 'interaction_no_tap'],
    icon: 'aerial',
    uniqueInformations: { villain_neighbor: neighborIsSuperVillain ? neighbors : [], }
  })
}
