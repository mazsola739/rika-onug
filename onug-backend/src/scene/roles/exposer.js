import { getRandomItemFromArray } from '../utils'

//TODO save which interaction!

const randomExposer = [
  "exposer_flip1_text",
  "exposer_flip2_text",
  "exposer_flip3_text",
]

const createExposer = (kickoffText) => () =>
  [kickoffText, getRandomItemFromArray(randomExposer)]

export const exposer = (gameState) => createExposer("exposer_kickoff_text")

export const doppelganger_exposer = () =>
  createExposer("doppelganger_exposer_kickoff_text")

/*   if (conditions.hasExposerPlayer(newGameState.players)) {
   const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
    return roles.exposer_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
  }
  if (conditions.hasDoppelgangerPlayer(newGameState.players) && conditions.hasExposerPlayer(newGameState.players)) {
   const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
    return roles.doppelganger_exposer_interaction(newGameState, actualSceneRoleTokens, sceneTitle) } */
  
//? INFO: Exposer - May flip 0-3 center cards over, the max via app
export const exposer_interaction = (gameState, tokens, title) => {}

export const exposer_response =  (gameState, token, selected_positions, title) => {}
