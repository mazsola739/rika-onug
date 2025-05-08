import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../sceneUtils'
import { alienAllKeys, alienAnyKeys, randomAlienInstructions } from './aliens.constants'
import { aliensAction } from './aliens.action'
import { hasCow } from '../../conditions'

//TODO fix alien pick together player

export const aliens = (gamestate, title, selected_cards) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const narration = ['aliens_kickoff']

  if (hasCow(selected_cards)) {
    narration.push('aliens_kickoff_cow')
  } else if (!hasCow(selected_cards)) {
    narration.push('aliens_kickoff_aliens')
  }

  const randomAlienInstruction = gamestate.alienexchange ? getRandomItemFromArray(['aliens_left', 'aliens_right']) : getRandomItemFromArray(randomAlienInstructions)
  let alienKey = []

  if (randomAlienInstruction.includes('view')) {
    alienKey = [getRandomItemFromArray(alienAnyKeys)]

    if (alienKey[0] === 'activePlayers') {
      alienKey = pickRandomUpToThreePlayers(gamestate.total_players, 'conjunction_and')
    }

    narration.push(randomAlienInstruction)
    narration.push(...alienKey)
  } else if (randomAlienInstruction === 'aliens_newalien' || randomAlienInstruction === 'aliens_alienhelper') {
    alienKey = [getRandomItemFromArray(alienAllKeys)]
    narration.push(randomAlienInstruction)
    narration.push(...alienKey)
  } else {
    narration.push(randomAlienInstruction)
  }

  gamestate.roles.aliens.instruction = randomAlienInstruction
  gamestate.roles.aliens.key = alienKey

  tokens.forEach(token => {
    let action = {}

    const card = gamestate.players[token].card

    if (isActivePlayer(card).ALIENS) {
      gamestate.players[token].action_finished = false

      action = aliensAction(gamestate, token, title)
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
