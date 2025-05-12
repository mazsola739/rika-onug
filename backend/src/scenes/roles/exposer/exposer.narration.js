import { randomExposerInstructions } from ".."
import { getRandomItemFromArray } from "../../sceneUtils"

export const exposerNarration = (gamestate, prefix) => {
  const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
  const narration = [`${prefix}_kickoff`, randomExposerInstruction]

  gamestate.roles[prefix].instruction = randomExposerInstruction
  return narration
}
