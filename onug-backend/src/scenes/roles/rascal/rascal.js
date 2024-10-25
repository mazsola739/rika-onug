import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { villageidiotInteraction } from '../villageidiot/villageidiot.interaction'
import { randomRascalInstructions, rascalAnyTwoKeys, rascalAnyOneKeys } from './rascal.constants'
import { rascalInteraction } from './rascal.interaction'

export const rascal = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const randomRascalInstruction = getRandomItemFromArray(randomRascalInstructions)
  const rascalKey = randomRascalInstruction === 'rascal_troublemaker_text' ? getRandomItemFromArray(rascalAnyTwoKeys) : getRandomItemFromArray(rascalAnyOneKeys)
  const narration = [`${prefix}_kickoff_text`]

  switch (randomRascalInstruction) {
    case 'rascal_troublemaker_text':
      narration.push('rascal_troublemaker_text', rascalKey)
      break
    case 'rascal_witch_text':
      narration.push('rascal_witch_text', rascalKey, 'rascal_witchend_text')
      break
    case 'rascal_drunk_text':
      narration.push('rascal_drunk_text', rascalKey, 'rascal_drunkend_text')
      break
    case 'rascal_robber_text':
      narration.push('rascal_robber_text', rascalKey, 'rascal_robberend_text')
      break
    case 'rascal_idiot_text':
      narration.push('rascal_idiot_text')
      break
  }

  newGamestate.rascal = {
    instruction: '',
    key: '',
  }
  newGamestate.oracle.instruction = randomRascalInstruction
  newGamestate.oracle.key = rascalKey

  tokens.forEach((token) => {
    let interaction = {}
    const card = newGamestate.players[token].card

    if ((prefix === 'rascal' && (card.player_original_id === 52 || (card.player_role_id === 52 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id)))) ||
      (prefix === 'doppelganger_rascal' && card.player_role_id === 52 && card.player_original_id === 1)) {
      if (randomRascalInstruction === 'rascal_idiot_text') {
        interaction = villageidiotInteraction(newGamestate, token, title)
      } else {
        interaction = rascalInteraction(newGamestate, token, title)
      }
    }

    scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
