import { getRandomItemFromArray } from '../../sceneUtils'
import { randomFamilyman } from './familyman.constants'

export const familymanNarration = (gamestate, hasDoppelganger) => {
  const total_players = gamestate.total_players

  let availableFamilyManOptions = []

  if (total_players === 3) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('3') || !option.includes('4'))
  } else if (total_players >= 4 && total_players < 5) {
    availableFamilyManOptions = randomFamilyman.filter(option => !option.includes('2eachside') || !option.includes('4'))
  }

  const randomAvailableOption = getRandomItemFromArray(availableFamilyManOptions)

  const narration = [hasDoppelganger ? 'doppelganger_familyman_kickoff' : 'familyman_kickoff', randomAvailableOption, randomAvailableOption.includes('1p') ? 'familyman_is_end' : 'familyman_are_end']

  gamestate.roles.familyman.instruction = randomAvailableOption

  return narration
}
