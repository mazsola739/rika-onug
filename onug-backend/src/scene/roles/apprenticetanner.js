export const apprenticetanner = (hasDoppelganger) => [
  hasDoppelganger
    ? "doppelganger_apprenticetanner_kickoff_text"
    : "apprenticetanner_kickoff_text",
  "apprenticetanner_kickoff2_text",
]

/* if (conditions.hasApprenticeTannerPlayer(newGameState.players) && conditions.hasTannerPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, [71])
  return roles.apprenticetanner_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
} */  //! doppelganger?

import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { getTannerNumberByRoleIds } from '../utils'

//? INFO: Apprentice Tanner - Tanner sticks out his thumb for him to see. Only wins if another Tanner dies. Multiple Apprentice Tanners are on the same team
export const apprenticetanner_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach(token => {
    const tanner = getTannerNumberByRoleIds(newGameState.players)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_tanner'],
        'tanner',
        null,
        null,
        null,
        null,
        tanner
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      tanner
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}
