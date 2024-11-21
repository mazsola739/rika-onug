import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../sceneUtils'
import { alienAllKeys, alienAnyKeys, randomAlienInstructions } from './aliens.constants'
import { aliensAction } from './aliens.action'

export const aliens = (gamestate, title) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['aliens_kickoff_text']
  const randomAlienInstruction = gamestate.alienexchange ? getRandomItemFromArray(['aliens_left_text', 'aliens_right_text']) : getRandomItemFromArray(randomAlienInstructions)
  let alienKey = []

  if (randomAlienInstruction.includes('view')) {
    alienKey = [getRandomItemFromArray(alienAnyKeys)]
    if (alienKey[0] === 'activePlayers') {
      alienKey = pickRandomUpToThreePlayers(gamestate.total_players, 'conjunction_and')
      narration.push(...alienKey)
      narration.push(randomAlienInstruction)
    }
  } else if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
    alienKey = [getRandomItemFromArray(alienAllKeys)]
    narration.push(randomAlienInstruction)
    narration.push(...alienKey)
  } else {
    narration.push(randomAlienInstruction)
  }

  gamestate.alien = {
    instruction: '',
    key: ''
  }
  gamestate.alien.instruction = randomAlienInstruction
  gamestate.alien.key = alienKey

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).ALIENS) {
      gamestate.players[token].action_finished = false
      action = aliensAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
