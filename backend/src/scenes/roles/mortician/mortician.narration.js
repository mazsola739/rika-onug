import { getRandomItemFromArray } from "../../sceneUtils"
import { randomMorticianInstructions, morticianKeys } from "./mortician.constants"

export const morticianNarration = (gamestate, prefix) => {
  const narration = [`${prefix}_kickoff`]
  const randomMorticianInstruction = getRandomItemFromArray(randomMorticianInstructions)
  const morticianKey = randomMorticianInstruction === 'mortician_2cards' ? 'identifier_bothneighbors' : getRandomItemFromArray(morticianKeys)
  narration.push(randomMorticianInstruction, morticianKey)

  gamestate.roles[prefix].instruction = randomMorticianInstruction
  gamestate.roles[prefix].key = morticianKey

  return narration
}
