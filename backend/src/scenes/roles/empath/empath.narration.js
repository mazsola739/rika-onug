import { getPlayerNumbersByGivenConditions, getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../sceneUtils'
import { empathKeys, randomEmpathInstructions } from './empath.constants'

export const empathNarration = (gamestate, prefix) => {
  const totalPlayers = gamestate.total_players
  const randomKey = getRandomItemFromArray(empathKeys)
  const randomPlayers = pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
  const empathKey = randomKey === 'activePlayers' ? randomPlayers : [randomKey]
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration = [...empathKey, randomEmpathInstruction]

  let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [...randomPlayers.filter(player => player !== 'conjunction_and').map(player => player.replace('identifier_player', 'player_'))]
  } else if (randomKey === 'identifier_oddplayers' || randomKey === 'identifier_evenplayers') {
    const evenOrOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''
    activePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate, evenOrOdd)
  } else if (randomKey === 'identifier_everyone') {
    activePlayerNumbers = getPlayerNumbersByGivenConditions(gamestate, 'allPlayers')
  }

  gamestate.roles[prefix].instruction = randomEmpathInstruction
  gamestate.roles[prefix].active_player_numbers = activePlayerNumbers

  return  narration 
}
