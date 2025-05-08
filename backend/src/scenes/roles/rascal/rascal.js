import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { villageidiotAction } from '..'
import { randomRascalInstructions, rascalAnyOneKeys, rascalAnyTwoKeys } from './rascal.constants'
import { rascalAction } from './rascal.action'

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

  gamestate.roles[prefix].instruction = randomRascalInstruction
  gamestate.roles[prefix].key = rascalKey

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'rascal' && isActivePlayer(card).RASCAL) || (prefix === 'doppelganger_rascal' && isActivePlayer(card).DOPPELGANGER_RASCAL)) {
      if (randomRascalInstruction === 'rascal_idiot_text') {
        gamestate.players[token].action_finished = false

        action = villageidiotAction(gamestate, token, title)
      } else {
        gamestate.players[token].action_finished = false

        action = rascalAction(gamestate, token, title, prefix)
      }
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
