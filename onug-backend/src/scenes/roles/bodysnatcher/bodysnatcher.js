import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { bodysnatcherKeys, randomBodysnatcherInstructions } from './bodysnatcher.constants'
import { bodysnatcherInteraction } from './bodysnatcher.interaction'

export const bodysnatcher = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  //todo better narration

  const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
  const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
  const narration = [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']

  /*   gamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  gamestate.bodysnatcher.instruction = randomAlienInstruction
  gamestate.bodysnatcher.key = alienKey */

  tokens.forEach(token => {
    let interaction = {}

    const card = gamestate.players[token].card

    if (prefix === 'bodysnatcher' && isActivePlayer(card).BODY_SNATCHER) {
      gamestate.players[token].action_finished = false
      interaction = bodysnatcherInteraction(gamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
    } else if (prefix === 'doppelganger_bodysnatcher' && isActivePlayer(card).DOPPELGÄNGER_BODY_SNATCHER) {
      gamestate.players[token].action_finished = false
      interaction = bodysnatcherInteraction(gamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
    }

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
