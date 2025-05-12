import { getRandomItemFromArray } from '../../sceneUtils'
import { randomRascalInstructions, rascalAnyTwoKeys, rascalAnyOneKeys } from './rascal.constants'

export const rascalNarration = (gamestate, prefix) => {
  const randomRascalInstruction = getRandomItemFromArray(randomRascalInstructions)
  const rascalKey = randomRascalInstruction === 'rascal_troublemaker' ? getRandomItemFromArray(rascalAnyTwoKeys) : getRandomItemFromArray(rascalAnyOneKeys)
  const narration = [`${prefix}_kickoff`]

  switch (randomRascalInstruction) {
    case 'rascal_troublemaker':
      narration.push('rascal_troublemaker', rascalKey)
      break
    case 'rascal_witch':
      narration.push('rascal_witch', rascalKey, 'rascal_witchend')
      break
    case 'rascal_drunk':
      narration.push('rascal_drunk', rascalKey, 'rascal_drunkend')
      break
    case 'rascal_robber':
      narration.push('rascal_robber', rascalKey, 'rascal_robberend')
      break
    case 'rascal_idiot':
      narration.push('rascal_idiot')
      break
  }

  gamestate.roles[prefix].instruction = randomRascalInstruction
  gamestate.roles[prefix].key = rascalKey

  return narration
}
