import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { bodysnatcherKeys, randomBodysnatcherInstructions } from './bodysnatcher.constants'
import { bodysnatcherInteraction } from './bodysnatcher.interaction'

export const bodysnatcher = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  //todo better narration

  const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
  const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
  const narration = [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']

  /*   newGamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  newGamestate.bodysnatcher.instruction = randomAlienInstruction
  newGamestate.bodysnatcher.key = alienKey */

  tokens.forEach(token => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (prefix === 'bodysnatcher' && isActivePlayer(card).BODY_SNATCHER) {
      newGamestate.players[token].action_finished = false
      interaction = bodysnatcherInteraction(newGamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
    } else if (prefix === 'doppelganger_bodysnatcher' && isActivePlayer(card).DOPPELGÄNGER_BODY_SNATCHER) {
      newGamestate.players[token].action_finished = false
      interaction = bodysnatcherInteraction(newGamestate, token, title, randomBodysnatcherInstruction, bodysnatcherKey)
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
