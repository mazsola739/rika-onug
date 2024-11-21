import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { morticianKeys, randomMorticianInstructions } from './mortician.constants'
import { morticianAction } from './mortician.action'

export const mortician = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`]
  //TODO
  const randomMorticianInstruction = getRandomItemFromArray(randomMorticianInstructions)
  const morticianKey = randomMorticianInstruction === 'mortician_2cards_text' ? 'identifier_bothneighbors_text' : getRandomItemFromArray(morticianKeys)
  // narration.push(randomMorticianInstruction, morticianKey)

  /*   gamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  gamestate.bodysnatcher.instruction = randomAlienInstruction
  gamestate.bodysnatcher.key = alienKey */

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (prefix === 'mortician' && isActivePlayer(card).MORTICIAN) {
      gamestate.players[token].action_finished = false

      action = morticianAction(gamestate, token, title, randomMorticianInstruction, morticianKey)
    } else if (prefix === 'doppelganger_mortician' && isActivePlayer(card).DOPPELGÄNGER_MORTICIAN) {
      action = morticianAction(gamestate, token, title, randomMorticianInstruction, morticianKey)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
