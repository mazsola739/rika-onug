import { isActivePlayer } from '../../activePlayer'
import { createAndSendSceneMessage, getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers } from '../../sceneUtils'
import { empathKeys, randomEmpathInstructions } from './empath.constants'
import { empathInteraction } from './empath.interaction'
import { empathNumbers } from './empath.utils'

export const empath = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const tokens = getAllPlayerTokens(newGamestate.players)
  const totalPlayers = newGamestate.total_players
  const randomKey = getRandomItemFromArray(empathKeys)
  const randomPlayers = pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
  const empathKey = randomKey === 'activePlayers' ? randomPlayers : [randomKey]
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration = [...empathKey, randomEmpathInstruction]

  let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [randomPlayers.map(player => parseInt(player.replace('identifier_player', '').replace('_text', '')))]
  } else if (randomKey === 'identifier_oddplayers_text' || randomKey === 'identifier_evenplayers_text' || randomKey === 'identifier.everyone_text') {
    const evenOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''
    activePlayerNumbers = empathNumbers(totalPlayers, evenOdd)
  }

  newGamestate.empath = {
    instruction: ''
  }
  newGamestate.empath.instruction = randomEmpathInstruction

  tokens.forEach(token => {
    let interaction = {}
    const playerNumber = newGamestate.players[token].player_number

    if (activePlayerNumbers.includes(playerNumber)) {
      const card = newGamestate.players[token].card
      const isNotEmpath = prefix === 'empath' && isActivePlayer(card).EMPATH
      const isNotDoppelgangerEmpath = prefix === 'doppelganger_empath' && isActivePlayer(card).DOPPELGÄNGER_EMPATH

      if (isNotEmpath || isNotDoppelgangerEmpath) {
        newGamestate.players[token].action_finished = false
        interaction = empathInteraction(newGamestate, token, title)
      }
    }

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)
  })

  newGamestate.narration.push({ [title]: narration })

  return newGamestate
}
