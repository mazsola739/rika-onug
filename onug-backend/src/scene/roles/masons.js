export const masons = (gameState) => ["masons_kickoff_text"]

//! TODO mason players
/* if (conditions.hasMasonPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, masonIds)
  return roles.masons_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */
import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { getPlayerNumbersWithMatchingTokens } from '../utils'

//? INFO: Mason (2) – Wakes up and looks for the other fellow Mason
export const masons_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    const masons = getPlayerNumbersWithMatchingTokens(newGameState.players, tokens)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_masons'],
        'mason',
        null,
        null,
        null,
        null,
        { masons, },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      masons,
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}
