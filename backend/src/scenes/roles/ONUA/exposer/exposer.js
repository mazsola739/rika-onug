import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../../sceneUtils'
import { randomExposerInstructions } from './exposer.constants'
import { exposerAction } from './exposer.action'

export const exposer = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)

  const randomExposerInstruction = getRandomItemFromArray(randomExposerInstructions)
  const narration = [`${prefix}_kickoff_text`, randomExposerInstruction]

  gamestate.roles[prefix].instruction = randomExposerInstruction

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'exposer' && isActivePlayer(card).EXPOSER) || (prefix === 'doppelganger_exposer' && isActivePlayer(card).DOPPELGANGER_EXPOSER)) {
      gamestate.players[token].action_finished = false

      action = exposerAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
