import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { morticianKeys, randomMorticianInstructions } from './mortician.constants'
import { morticianInteraction } from './mortician.interaction'

export const mortician = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [`${prefix}_kickoff_text`]
  //TODO
  const randomMorticianInstruction = getRandomItemFromArray(randomMorticianInstructions)
  const morticianKey = randomMorticianInstruction === 'mortician_2cards_text' ? 'identifier_bothneighbors_text' : getRandomItemFromArray(morticianKeys)
  // narration.push(randomMorticianInstruction, morticianKey)

  /*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'mortician' && isActivePlayer(card).MORTICIAN) {
      newGamestate.players[token].action_finished = false
      interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
    } else if (prefix === 'doppelganger_mortician' && isActivePlayer(card).DOPPELGÄNGER_MORTICIAN) {
      interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
