//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { alienAbducted, getAllPlayerTokens } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

//TODO aliens can see cow
export const cow = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger 
      ? 'doppelganger_cow_kickoff_text' 
      : 'cow_kickoff_text',
    'cow_kickoff2_text',
  ]

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 45 || (card.player_role_id === 45 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = cow_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.scene = scene
  return newGameState
}

export const cow_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }

  const neighborIsAlien = alienAbducted(newGameState.players, token)

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    alien_neighbor: neighborIsAlien,
  }

  return generateRoleInteraction(newGameState, token, {
    private_message:  [neighborIsAlien ? 'interaction_got_tapped_by_alien' : 'interaction_no_tap'],
    icon: 'cow',
    uniqInformations: { alien_neighbor: neighborIsAlien }
  })
}
