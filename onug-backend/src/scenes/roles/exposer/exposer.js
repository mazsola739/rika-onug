import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomExposerInstructions } from './exposer.constants'
import { exposerInteraction } from './exposer.interaction'

export const exposer = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  //todo better narration

  const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
  const narration = [`${prefix}_kickoff_text`, randomExposerInstruction]

  newGamestate.exposer = {
    instruction: ''
  }
  newGamestate.exposer.instruction = randomExposerInstruction

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'exposer' && isActivePlayer(card).EXPOSER) {
      newGamestate.players[token].action_finished = false
      interaction = exposerInteraction(newGamestate, token, title)
    } else if (prefix === 'doppelganger_exposer' && isActivePlayer(card).DOPPELGÄNGER_EXPOSER) {
      newGamestate.players[token].action_finished = false
      interaction = exposerInteraction(newGamestate, token, title)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
