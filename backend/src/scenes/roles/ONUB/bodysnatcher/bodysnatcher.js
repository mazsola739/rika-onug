import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../../sceneUtils'
import { bodysnatcherKeys, randomBodysnatcherInstructions } from './bodysnatcher.constants'
import { bodysnatcherAction } from './bodysnatcher.action'

export const bodysnatcher = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)

  const randomBodysnatcherInstruction = getRandomItemFromArray(randomBodysnatcherInstructions)
  const bodysnatcherKey = getRandomItemFromArray(bodysnatcherKeys)
  const narration = [`${prefix}_kickoff_text`, randomBodysnatcherInstruction, randomBodysnatcherInstruction === 'bodysnatcher_steal_text' ? bodysnatcherKey : '', 'bodysnatcher_end_text']

  gamestate.roles[prefix].instruction = randomBodysnatcherInstruction
  gamestate.roles[prefix].key = bodysnatcherKey

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'bodysnatcher' && isActivePlayer(card).BODY_SNATCHER) || (prefix === 'doppelganger_bodysnatcher' && isActivePlayer(card).DOPPELGANGER_BODY_SNATCHER)) {
      gamestate.players[token].action_finished = false

      action = bodysnatcherAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
