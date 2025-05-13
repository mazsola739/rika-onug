import { alienAllKeys, alienAnyKeys, randomAlienInstructions } from '..'
import { hasCow } from '../../conditions'
import { getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../sceneUtils'

export const aliensNarration = (gamestate, selected_cards) => {
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

  return narration
}
