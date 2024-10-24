import { IDS, SCENE } from '../../../constants'
import { getAllPlayerTokens, getRandomItemFromArray, pickRandomUpToThreePlayers, getSceneEndTime } from '../../sceneUtils'
import { empathKeys, randomEmpathInstructions } from './empath.constants'
import { empathInteraction } from './empath.interaction'
import { empathNumbers } from './empath.utils'

export const empath = (gamestate, title, prefix) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)  
  const totalPlayers = newGamestate.total_players
  const randomKey = getRandomItemFromArray(empathKeys)
  const randomPlayers = pickRandomUpToThreePlayers(totalPlayers, 'conjunction_and')
  const empathKey = randomKey === 'activePlayers' ? randomPlayers : [randomKey]
  const randomEmpathInstruction = getRandomItemFromArray(randomEmpathInstructions)
  const narration = [...empathKey, randomEmpathInstruction]
  const actionTime = 8

  let activePlayerNumbers = []
  if (randomKey === 'activePlayers') {
    activePlayerNumbers = [randomPlayers.map(player => parseInt(player.replace('identifier_player', '').replace('_text', '')))]
  } else if (randomKey === 'identifier_oddplayers_text' || randomKey === 'identifier_evenplayers_text' || randomKey === 'identifier_everyone_text') {
    const evenOdd = randomKey.includes('even') ? 'even' : randomKey.includes('odd') ? 'odd' : ''
    activePlayerNumbers = empathNumbers(totalPlayers, evenOdd)
  }

  newGamestate.empath = {
    instruction: '',
  }
  newGamestate.empath.instruction = randomEmpathInstruction
  
  tokens.forEach((token) => {
    let interaction = {}
    const playerNumber = newGamestate.players[token].player_number
    
    if (activePlayerNumbers.includes(playerNumber)) {
      const card = newGamestate.players[token].card
      const isNotEmpath = prefix === 'empath' && (card.player_original_id !== 77 || (card.player_role_id !== 20 && IDS.COPY_PLAYER_IDS.includes(card.player_original_id)));
      const isNotDoppelgangerEmpath = prefix === 'doppelganger_empath' && (card.player_role_id !== 20 && card.player_original_id === 1);
    
      if (isNotEmpath || isNotDoppelgangerEmpath) {
        interaction = empathInteraction(newGamestate, token, title);
      }
    }
    
    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}
