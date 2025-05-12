import { getRandomItemFromArray } from "../../sceneUtils"
import { randomBodysnatcherInstructions, bodysnatcherKeys } from "./bodysnatcher.constants"

export const bodysnatcherNarration = (gamestate, prefix) => {
  const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
  const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
  const narration = [`${prefix}_kickoff`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal' ? bodysnatcherKey : '', 'bodysnatcher_end']

  gamestate.roles[prefix].instruction = randomBodysnatcherInstruction
  gamestate.roles[prefix].key = bodysnatcherKey

  return narration
}