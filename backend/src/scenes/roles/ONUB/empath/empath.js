import { isActivePlayer } from '../../../activePlayer'
import { createAndSendSceneMessage, empathVotersPlayerNumbers, getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../../sceneUtils'
import { empathAction, empathEveryoneAction } from './empath.action'
import { empathKeys, randomEmpathInstructions } from './empath.constants'

//TODO fix non-empaths voting

export const empath = (gamestate, title, prefix) => {
  const tokens = getAllPlayerTokens(gamestate.players)
  const totalPlayers = gamestate.total_players
  const randomKey = getRandomItemFromArray(empathKeys)
  const randomPlayers = pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
  const empathKey = randomKey === 'activePlayers' ? randomPlayers : [randomKey]
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration = [...empathKey, randomEmpathInstruction]

  let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [...randomPlayers.map(player => player.replace('identifier_player', 'player_').replace('_text', ''))]
  } else if (randomKey === 'identifier_oddplayers_text' || randomKey === 'identifier_evenplayers_text' || randomKey === 'identifier_everyone_text') {
    const evenOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''
    activePlayerNumbers = empathVotersPlayerNumbers(totalPlayers, evenOdd)
  }

  gamestate.roles[prefix].instruction = randomEmpathInstruction

  tokens.forEach(token => {
    let action = {}
    const card = gamestate.players[token].card

    if ((prefix === 'empath' && isActivePlayer(card).EMPATH) || (prefix === 'doppelganger_empath' && isActivePlayer(card).DOPPELGANGER_EMPATH)) {
      action = empathAction(gamestate, token, title, prefix)
    } else {
      action = empathEveryoneAction(gamestate, token, title, prefix)
    }

    gamestate.players[token].action_finished = false

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.scenes.narration.push({ [title]: narration })

  return gamestate
}
