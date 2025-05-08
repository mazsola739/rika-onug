import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { villageidiotAction } from '..'
import { randomRascalInstructions, rascalAnyOneKeys, rascalAnyTwoKeys } from './rascal.constants'
import { rascalAction } from './rascal.action'

export const rascal = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
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

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'rascal' && isActivePlayer(card).RASCAL) || (prefix === 'doppelganger_rascal' && isActivePlayer(card).DOPPELGANGER_RASCAL)) {
      if (randomRascalInstruction === 'rascal_idiot') {
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
