import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { randomExposerInstructions } from './exposer.constants'
import { exposerInteraction } from './exposer.interaction'

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
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'exposer' && isActivePlayer(card).EXPOSER) {
      gamestate.players[token].action_finished = false
      interaction = exposerInteraction(gamestate, token, title)
    } else if (prefix === 'doppelganger_exposer' && isActivePlayer(card).DOPPELGÄNGER_EXPOSER) {
      gamestate.players[token].action_finished = false
      interaction = exposerInteraction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
