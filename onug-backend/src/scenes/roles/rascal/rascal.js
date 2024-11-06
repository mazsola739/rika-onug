import { COPY_PLAYER } from '../../../constants'
import {
  createAndSendSceneMessage,
  getAllPlayerTokens,
  getRandomItemFromArray,
} from '../../sceneUtils'
import { villageidiotInteraction } from '../villageidiot/villageidiot.interaction'
import {
  randomRascalInstructions,
  rascalAnyOneKeys,
  rascalAnyTwoKeys,
} from './rascal.constants'
import { rascalInteraction } from './rascal.interaction'

export const rascal = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const randomRascalInstruction = getRandomItemFromArray(
    randomRascalInstructions
  )
  const rascalKey =
    randomRascalInstruction === 'rascal_troublemaker_text'
      ? getRandomItemFromArray(rascalAnyTwoKeys)
      : getRandomItemFromArray(rascalAnyOneKeys)
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

    if (
      (prefix === 'rascal' &&
        (card.player_original_id === 52 ||
          (card.player_role_id === 52 &&
            COPY_PLAYER.includes(card.player_original_id)))) ||
      (prefix === 'doppelganger_rascal' &&
        card.player_role_id === 52 &&
        card.player_original_id === 1)
    ) {
      if (randomRascalInstruction === 'rascal_idiot_text') {
        newGamestate.players[token].action_finished = false
        interaction = villageidiotInteraction(newGamestate, token, title)
      } else {
        newGamestate.players[token].action_finished = false
        interaction = rascalInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(
      newGamestate,
      token,
      title,
      interaction,
      narration
    )
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
