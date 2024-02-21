export const leader = (hasDoppelganger) => [
  hasDoppelganger ? "doppelganger_leader_kickoff_text" : "leader_kickoff_text",
  "leader_kickoff2_text",
]

export const leader_zerbgroob = (gameState) => ["leader_zerbgroob_text"]

/*       if (conditions.hasLeaderPlayer && conditions.hasAnyAlienPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.leader_interaction(newGameState, tokens, sceneTitle)
      } 
            if (conditions.hasLeaderPlayer && conditions.hasGroobAndZerbPlayer) {
        tokens = getTokensByOriginalIds(players, [1])
        return roles.leader_zerbgroob_interaction(newGameState, tokens, sceneTitle)
      }
      */

//? INFO: Leader - Aliens must stick out thumb for him to see. if all Aliens vote the Leader, they win, even if an Alien is killed. If Groob and Zerb are in play, he is on his own team wins if they survive
//TODO doppelganger
export const leader_interaction = (gameState, tokens, title) => {}

export const leader_response =  (gameState, token, selected_positions, title) => {}
