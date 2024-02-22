//@ts-check
//@ts-check
//@ts-check
import { getRandomItemFromArray } from '../../utils/scene'

const random_easteregg_nobadguys = [
  "easteregg_nobadguys_text_1",
  "easteregg_nobadguys_text_2",
  "easteregg_nobadguys_text_3",
  "easteregg_nobadguys_text_4",
  "easteregg_nobadguys_text_5",
  "easteregg_nobadguys_text_6",
  "easteregg_nobadguys_text_7",
  "easteregg_nobadguys_text_8",
  "easteregg_nobadguys_text_9",
  "easteregg_nobadguys_text_10",
]
const random_easteregg_nogoodguys = [
  "easteregg_nogoodguys_text_1",
  "easteregg_nogoodguys_text_2",
  "easteregg_nogoodguys_text_3",
  "easteregg_nogoodguys_text_4",
  "easteregg_nogoodguys_text_5",
  "easteregg_nogoodguys_text_6",
  "easteregg_nogoodguys_text_7",
  "easteregg_nogoodguys_text_8",
  "easteregg_nogoodguys_text_9",
  "easteregg_nogoodguys_text_10",
]

export const epicbattle = (hasEasterEgg, hasEpicBattle, totalPlayers, nogoodguys, nobadguys) => {
  if (hasEpicBattle) {
    return ["everyone_epic_intro_text"]
  }
  
  const result = []

  if (hasEasterEgg) {
    if (totalPlayers === 12) {
      result.push("easteregg_really_text", "easteregg_whatever_text")
    } else if (nobadguys) {
      result.push(getRandomItemFromArray(random_easteregg_nobadguys), "easteregg_whatever_text")
    } else if (nogoodguys) {
      result.push(getRandomItemFromArray(random_easteregg_nogoodguys), "easteregg_whatever_text")
    }
  }

  return result
}
