import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomExposerInstructions } from './exposer.constants'
import { exposerAction } from './exposer.action'

export const exposer = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  //todo better narration

  const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
  const narration = [`${prefix}_kickoff_text`, randomExposerInstruction]

  gamestate.exposer = {
    instruction: ''
  }
  gamestate.exposer.instruction = randomExposerInstruction

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (prefix === 'exposer' && isActivePlayer(card).EXPOSER) {
      gamestate.players[token].action_finished = false

      action = exposerAction(gamestate, token, title)
    } else if (prefix === 'doppelganger_exposer' && isActivePlayer(card).DOPPELGÄNGER_EXPOSER) {
      gamestate.players[token].action_finished = false

      action = exposerAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
