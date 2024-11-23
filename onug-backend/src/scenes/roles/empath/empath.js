import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../sceneUtils'
import { empathKeys, randomEmpathInstructions } from './empath.constants'
import { empathAction } from './empath.action'
import { empathNumbers } from '../../sceneUtils/empathNumbers'

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
    activePlayerNumbers = [randomPlayers.map(player => parseInt(player.replace('identifier_player', '').replace('_text', '')))]
  } else if (randomKey === 'identifier_oddplayers_text' || randomKey === 'identifier_evenplayers_text' || randomKey === 'identifier_everyone_text') {
    const evenOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''
    activePlayerNumbers = empathNumbers(totalPlayers, evenOdd)
  }

  gamestate.empath = {
    instruction: ''
  }
  gamestate.empath.instruction = randomEmpathInstruction

  tokens.forEach(token => {
    let action = {}
    const playerNumber = gamestate.players[token].player_number

    if (activePlayerNumbers.includes(playerNumber)) {
      const card = gamestate.players[token].card
      const isNotEmpath = prefix === 'empath' && isActivePlayer(card).EMPATH
      const isNotDoppelgangerEmpath = prefix === 'doppelganger_empath' && isActivePlayer(card).DOPPELGÄNGER_EMPATH

      if (isNotEmpath || isNotDoppelgangerEmpath) {
        gamestate.players[token].action_finished = false

        action = empathAction(gamestate, token, title)
      }
    }

    createAndSendSceneMessage(gamestate, token, title, action, narration)
  })

  gamestate.narration.push({ [title]: narration })

  return gamestate
}
