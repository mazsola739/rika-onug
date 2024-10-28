import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomMorticianInstructions, morticianKeys } from './mortician.constants'
import { morticianInteraction } from './mortician.interaction'

export const mortician = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
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
      if (card.player_original_id === 49 || (card.player_role_id === 49 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id))) {
        interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
      }
    } else if (prefix === 'doppelganger_mortician') {
      if (card.player_role_id === 49 && card.player_original_id === 1) {
        interaction = morticianInteraction(newGamestate, token, title, randomMorticianInstruction, morticianKey)
      }
    }

    Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  })

  newGamestate.narration.push(narration)
  newGamestate.scene = scene

  return newGamestate
}
