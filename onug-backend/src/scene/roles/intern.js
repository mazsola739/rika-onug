export const intern = (hasDoppelganger, hasMadScientist) => [
  hasDoppelganger ? "doppelganger_intern_kickoff_text" : "intern_kickoff_text",
  hasMadScientist ? "intern_kickoff2_text" : "intern_kickoff_alone_text",
]

//! doppelganger?, hasMad?
/* if (conditions.hasInternPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(newGameState.players, conditions.hasDoppelgangerPlayer ? [62, 1] : [62])
  return roles.intern_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
}
 */
import { generateSceneRoleInteractions } from '../generate-scene-role-interactions'
import { getMadScientistPlayerNumberByRoleIds } from '../utils'

export const intern_interaction = (gameState, tokens, title) => {
  const newGameState = { ...gameState }
  const scene_role_interactions = []

  tokens.forEach((token) => {
    const madscientistPlayerNumbers = getMadScientistPlayerNumberByRoleIds(newGameState.players)
    const playerCard = newGameState.players[token]?.card

    if (madscientistPlayerNumbers.length === 0) {
      playerCard.player_role_id = 63
      playerCard.player_role = 'MAD_SCIENTIST'
    }

    scene_role_interactions.push(
      generateSceneRoleInteractions(
        newGameState,
        title,
        token,
        [madscientistPlayerNumbers.length === 0 ? "interaction_mad_now" : "interaction_mad"],
        'mad',
        null,
        null,
        null,
        null,
        { madscientist: madscientistPlayerNumbers, },
      )
    )

    const playerHistory = {
      ...newGameState.players[token].player_history,
      ...newGameState.actual_scene,
      madscientist: madscientistPlayerNumbers,
    }
    newGameState.players[token].player_history = playerHistory
  })

  return { ...newGameState, scene_role_interactions }
}