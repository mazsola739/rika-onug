import { getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../sceneUtils'
import { empathKeys, randomEmpathInstructions } from './empath.constants'

export const empathNarration = (gamestate, prefix) => {
  const totalPlayers = gamestate.total_players
  const randomKey = getRandomItemFromArray(empathKeys)
  const randomPlayers = pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
  const empathKey = randomKey === 'activePlayers' ? randomPlayers : [randomKey]
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration = [...empathKey, randomEmpathInstruction]

  const empathVotersPlayerNumbers = (totalPlayers, evenOdd = '') => {
    const result = []

    totalPlayers = Math.min(Math.max(1, totalPlayers), 12)

    let start = 1
    let step = 1
    if (evenOdd === 'even') {
      start = 2
      step = 2
    } else if (evenOdd === 'odd') {
      start = 1
      step = 2
    }

    for (let i = start; i <= totalPlayers; i += step) {
      result.push(`player_${i}`)
    }

    return result
  }

  let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [...randomPlayers.map(player => player.replace('identifier_player', 'player_'))]
  } else if (randomKey === 'identifier_oddplayers' || randomKey === 'identifier_evenplayers' || randomKey === 'identifier_everyone') {
    const evenOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''

    //TODO fix!
    activePlayerNumbers = empathVotersPlayerNumbers(totalPlayers, evenOdd)
  }
  console.log(activePlayerNumbers)
  gamestate.roles[prefix].instruction = randomEmpathInstruction

  return narration
}
