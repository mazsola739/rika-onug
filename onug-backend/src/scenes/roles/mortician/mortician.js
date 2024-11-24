import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { morticianKeys, randomMorticianInstructions } from './mortician.constants'
import { morticianAction } from './mortician.action'

export const mortician = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`]
  const randomMorticianInstruction = getRandomItemFromArray(randomMorticianInstructions)
  const morticianKey = randomMorticianInstruction === 'mortician_2cards_text' ? 'identifier_bothneighbors_text' : getRandomItemFromArray(morticianKeys)
  narration.push(randomMorticianInstruction, morticianKey)

  gamestate[prefix] = {
    instruction: '',
    key: ''
  }
  gamestate[prefix].instruction = randomMorticianInstruction
  gamestate[prefix].key = morticianKey

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'mortician' && isActivePlayer(card).MORTICIAN) || (prefix === 'doppelganger_mortician' && isActivePlayer(card).DOPPELGÄNGER_MORTICIAN)) {
      gamestate.players[token].action_finished = false

      action = morticianAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
