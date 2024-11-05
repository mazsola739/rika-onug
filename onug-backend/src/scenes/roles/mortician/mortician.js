import { COPY_PLAYER } from "../../../constants"
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

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'mortician') {
      if (card.player_original_id === 49 || (card.player_role_id === 49 && COPY_PLAYER.includes(card.player_original_id))) {
        newGamestate.players[token].action_finished = false
        interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
      }
    } else if (prefix === 'doppelganger_mortician') {
      if (card.player_role_id === 49 && card.player_original_id === 1) {
        interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({[title]: narration})

  return newGamestate
}
