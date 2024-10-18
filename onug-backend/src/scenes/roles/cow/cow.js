import { ALL_COPY_PLAYER_IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getPlayerNeighborsByToken, getSceneEndTime } from '../../../utils'
import { generateRoleInteraction } from '../../generateRoleInteraction'
import { getAlienPlayerNumbersByRoleIds, getNeighborPlayerNumbersByToken } from '../../utils'

export const alienAbducted = (players, cowToken) => {
  const cowNeighbors = getNeighborPlayerNumbersByToken(players, cowToken)
  const aliens = getAlienPlayerNumbersByRoleIds(players)

  for (let alien of aliens) {
    if (cowNeighbors.includes(alien)) {
      return true
    }
  }

  return false
}

//TODO aliens can see cow
export const cow = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger 
      ? 'doppelganger_cow_kickoff_text' 
      : 'cow_kickoff_text',
    'cow_kickoff2_text',
  ]
  const actionTime = 8

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 45 || (card.player_role_id === 45 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = cowInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const cowInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const neighborIsAlien = alienAbducted(newGamestate.players, token)
  const neighbors = getPlayerNeighborsByToken(newGamestate.players, 'both', 1)

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    alien_neighbor: neighborIsAlien ? neighbors : [],
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message:  [neighborIsAlien ? 'interaction_got_tapped_by_alien' : 'interaction_no_tap'],
    icon: 'cow',
    uniqueInformations: { alien_neighbor: neighborIsAlien ? neighbors : [], }
  })
}
