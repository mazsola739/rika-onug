export const minion = (hasDoppelganger) => [
  hasDoppelganger ? "doppelganger_minion_kickoff_text" : "minion_kickoff_text",
  "minion_kickoff2_text",
]

 //! doppelganger?
/*  if (conditions.hasMinionPlayer) {
  tokens = getTokensByOriginalIds(newGameState.players, [7])
  return roles.minion_interaction(newGameState, tokens, sceneTitle)
} */

import { updatePlayerCard } from '../update-player-card'
import { generateSceneRoleInteractions } from '../generate-role-interactions'

//? INFO: Minion - All Werewolf team (not Minion/Squire) stick up their thumb for him to see
export const minion_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    const werewolfPlayerNumbers = [...newGameState.werewolves, ...newGameState.dreamwolf]

    updatePlayerCard(newGameState, token)

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        ['interaction_werewolves'],
        'werewolf',
        null,
        null,
        null,
        null,
         {werewolves: werewolfPlayerNumbers, },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      werewolves: werewolfPlayerNumbers,
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}
