import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray } from '../../sceneUtils'
import { psychicKeys, randomPsychicInstructions } from './psychic.constants'
import { psychicAction } from './psychic.action'

export const psychic = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const total_players = gamestate.total_players

  let availablePsychicOptions = []

  if (total_players === 3) {
    availablePsychicOptions = randomPsychicInstructions.filter(option => !option.includes('view2'))
  }
  //todo better narration and save into constants
  /*   gamestate.bodysnatcher = {
    instruction: '',
    key: '',
  }
  gamestate.bodysnatcher.instruction = randomAlienInstruction
  gamestate.bodysnatcher.key = alienKey */

  const narration = [`${prefix}_kickoff_text`, getRandomItemFromArray(availablePsychicOptions), getRandomItemFromArray(psychicKeys)]

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (prefix === 'psychic' && isActivePlayer(card).PSYCHIC) {
      gamestate.players[token].action_finished = false
      action = psychicAction(gamestate, token, title, randomPsychicInstructions, psychicKeys)
    } else if (prefix === 'doppelganger_psychic' && isActivePlayer(card).DOPPELGÄNGER_PSYCHIC) {
      gamestate.players[token].action_finished = false
      action = psychicAction(gamestate, token, title, randomPsychicInstructions, psychicKeys)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
