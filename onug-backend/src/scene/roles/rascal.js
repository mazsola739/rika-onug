import { getRandomItemFromArray } from '../utils'

//TODO save which interaction!

const random_rascal = [
  "rascal_idiot_text",
  "rascal_troublemaker_text",
  "rascal_witch_text",
  "rascal_drunk_text",
  "rascal_robber_text",
]
const rascalAnyOneKeys = [
  "identifier_higher_text",
  "identifier_lower_text",
  "identifier_any_text",
  "identifier_anyeven_text",
  "identifier_anyodd_text",
  "identifier_oneneighbor_text",
  "identifier_center_text",
  "identifier_leftneighbor_text",
  "identifier_rightneighbor_text",
]
const rascalAnyTwoKeys = [
  "identifier_any2_text",
  "identifier_any2even_text",
  "identifier_any2odd_text",
  "identifier_any2higher_text",
  "identifier_any2lower_text",
  "identifier_2leftneighbors_text",
  "identifier_2rightneighbors_text",
]

const createRascal = (kickoffText) => () => {
  const result = [kickoffText]
  const randomInstructions = getRandomItemFromArray(random_rascal)
  const randomAnyOne = getRandomItemFromArray(rascalAnyOneKeys)
  const randomAnyTwo = getRandomItemFromArray(rascalAnyTwoKeys)

  switch (randomInstructions) {
    case "rascal_troublemaker_text":
      result[1] = "rascal_troublemaker_text"
      result[2] = randomAnyTwo
      break
    case "rascal_witch_text":
      result[1] = "rascal_witch_text"
      result[2] = randomAnyOne
      result[3] = "rascal_witchend_text"
      break
    case "rascal_drunk_text":
      result[1] = "rascal_drunk_text"
      result[2] = randomAnyOne
      result[3] = "rascal_drunkend_text"
      break
    case "rascal_robber_text":
      result[1] = "rascal_robber_text"
      result[2] = randomAnyOne
      result[3] = "rascal_robberend_text"
      break
    default:
      result[1] = "rascal_idiot_text"
  }

  return result
}

export const rascal = (gameState) => createRascal("rascal_kickoff_text")

export const doppelganger_rascal = () =>
  createRascal("doppelganger_rascal_kickoff_text")

/*   if (conditions.hasRascalPlayer) {
    tokens = getTokensByOriginalIds(players, [1])
    return roles.rascal_interaction(newGameState, tokens, sceneTitle)
  }
  if (conditions.hasDoppelgangerPlayer && conditions.hasRascalPlayer) {
    tokens = getTokensByOriginalIds(players, [1])
    return roles.doppelganger_rascal_interaction(newGameState, tokens, sceneTitle)
  } */
//? INFO: Rascal - May manipulate cards via app such as stealing, switching, moving, etc
//TODO doppelganger
export const rascal_interaction = (gameState, tokens, title) => {}

export const rascal_response =  (gameState, token, selected_positions, title) => {}