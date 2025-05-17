import { getRandomItemFromArray } from "../../sceneUtils"
import { randomBlobKickoffText } from "./blob.constants"

export const blobNarration = (gamestate) => {
  const total_players = gamestate.total_players

  let availableBlobOptions = []

  if (total_players === 3) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') && !option.includes('3') && !option.includes('4'))
  } else if (total_players >= 4 && total_players < 5) {
    availableBlobOptions = randomBlobKickoffText.filter(option => !option.includes('2eachside') && !option.includes('4'))
  }

  const randomKickoff = getRandomItemFromArray(availableBlobOptions)
  const narration = [randomKickoff, randomKickoff.includes('1p') ? 'blob_is_end' : 'blob_are_end']

  gamestate.roles.blob.instruction = randomKickoff

  return narration
}