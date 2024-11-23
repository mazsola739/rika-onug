import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { psychicKeys, randomPsychicInstructions } from './psychic.constants'
import { psychicAction } from './psychic.action'

export const psychic = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff_text`]
  const randomPsychicInstruction = getRandomItemFromArray(randomPsychicInstructions)
  const psychicKey = getRandomItemFromArray(psychicKeys)

  gamestate.psychic = {
    instruction: '',
    key: '',
  }

  gamestate.psychic.instruction = randomPsychicInstruction
  gamestate.psychic.key = psychicKey

  narration.push(...[randomPsychicInstruction, psychicKey])

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (prefix === 'psychic' && isActivePlayer(card).PSYCHIC) {
      gamestate.players[token].action_finished = false

      action = psychicAction(gamestate, token, title)
    } else if (prefix === 'doppelganger_psychic' && isActivePlayer(card).DOPPELGÄNGER_PSYCHIC) {
      gamestate.players[token].action_finished = false

      action = psychicAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
