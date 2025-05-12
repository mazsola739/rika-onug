import { getRandomItemFromArray } from '../../sceneUtils'
import { randomPsychicInstructions, psychicKeys } from './psychic.constants'

export const psychicNarration = (gamestate, prefix) => {
  const narration = [`${prefix}_kickoff`]
  const randomPsychicInstruction = getRandomItemFromArray(randomPsychicInstructions)
  const psychicKey = getRandomItemFromArray(psychicKeys)

  gamestate.roles[prefix].instruction = randomPsychicInstruction
  gamestate.roles[prefix].key = psychicKey

  narration.push(...[randomPsychicInstruction, psychicKey])
  return narration
}
