import { getRandomItemFromArray } from '../utils'

//TODO save which interaction!

const random_psychic = ["psychic_view1_text", "psychic_view2_text"]
const psychicKeys = ["identifier_anyeven_text", "identifier_anyodd_text"]

/* if (conditions.hasPsychicPlayer(newGameState.players)) {
 const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
  return roles.psychic_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
}
      if (conditions.hasDoppelgangerPlayer(newGameState.players) && conditions.hasPsychicPlayer(newGameState.players)) {
       const actualSceneRoleTokens = getTokensByOriginalIds(players, [1])
        return roles.doppelganger_psychic_interaction(newGameState, actualSceneRoleTokens, sceneTitle)
      } */
const createPsychic = (kickoffText) => () =>
  [
    kickoffText,
    getRandomItemFromArray(random_psychic),
    getRandomItemFromArray(psychicKeys),
  ]

export const psychic = (gameState) => createPsychic("psychic_kickoff_text")

export const doppelganger_psychic = () =>
  createPsychic("doppelganger_psychic_kickoff_text")


  
//? INFO: Psychic - Looks at 1-2 cards, which in position via app such as neighbors, center, odd or even players
//TODO doppelganger
export const psychic_interaction = (gameState, tokens, title) => {}

export const psychic_response =  (gameState, token, selected_positions, title) => {}