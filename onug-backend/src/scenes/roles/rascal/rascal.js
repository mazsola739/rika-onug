import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { villageidiotInteraction } from '../villageidiot/villageidiot.action'
import { randomRascalInstructions, rascalAnyOneKeys, rascalAnyTwoKeys } from './rascal.constants'
import { rascalInteraction } from './rascal.action'

export const rascal = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
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

  gamestate.rascal = {
    instruction: '',
    key: ''
  }
  gamestate.oracle.instruction = randomRascalInstruction
  gamestate.oracle.key = rascalKey

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'rascal' && isActivePlayer(card).RASCAL) || (prefix === 'doppelganger_rascal' && isActivePlayer(card).DOPPELGÄNGER_RASCAL)) {
      if (randomRascalInstruction === 'rascal_idiot_text') {
        gamestate.players[token].action_finished = false
        action = villageidiotInteraction(gamestate, token, title)
      } else {
        gamestate.players[token].action_finished = false
        action = rascalInteraction(gamestate, token, title)
      }
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
