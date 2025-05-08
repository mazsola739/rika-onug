import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { psychicKeys, randomPsychicInstructions } from './psychic.constants'
import { psychicAction } from './psychic.action'

export const psychic = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = [`${prefix}_kickoff`]
  const randomPsychicInstruction = getRandomItemFromArray(randomPsychicInstructions)
  const psychicKey = getRandomItemFromArray(psychicKeys)

  gamestate.roles[prefix].instruction = randomPsychicInstruction
  gamestate.roles[prefix].key = psychicKey

  narration.push(...[randomPsychicInstruction, psychicKey])

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if ((prefix === 'psychic' && isActivePlayer(card).PSYCHIC) || (prefix === 'doppelganger_psychic' && isActivePlayer(card).DOPPELGANGER_PSYCHIC)) {
      gamestate.players[token].action_finished = false

      action = psychicAction(gamestate, token, title, prefix)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
