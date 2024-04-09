//@ts-check
import { allCopyPlayerIds, SCENE } from '../../constant'
import { getAllPlayerTokens, getVampirePlayerNumbersByRoleIds, getVampirePlayerNumbersByMark, getPlayerNumberWithMatchingToken, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

//TODO no vampire he is villager
export const renfield = (gameState, title, hasDoppelganger) => {
  const newGameState = { ...gameState }
  const scene = []
  const tokens = getAllPlayerTokens(newGameState.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_renfield_kickoff_text'
      : 'renfield_kickoff_text',
    'renfield_kickoff2_text',
  ]
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGameState.players[token].card

    if (card.player_original_id === 38 || (card.player_role_id === 38 && allCopyPlayerIds.includes(card.player_original_id))) {
      interaction = renfield_interaction(newGameState, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGameState.actual_scene.scene_end_time = getSceneEndTime(newGameState.actual_scene.scene_start_time, actionTime)
  newGameState.scene = scene

  return newGameState
}

export const renfield_interaction = (gameState, token, title) => {
  const newGameState = { ...gameState }
  const vampires = getVampirePlayerNumbersByRoleIds(newGameState.players)
  const newVampire = getVampirePlayerNumbersByMark(newGameState.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGameState.players, token)
  const currentPlayerMark = newGameState.card_positions[currentPlayerNumber].mark

  if (gameState.players[token].card.player_original_id === 1) {
    const batPosition = newGameState.doppelganger_mark_positions.bat
    newGameState.doppelganger_mark_positions.bat = currentPlayerMark
    newGameState.card_positions[currentPlayerNumber].mark = batPosition
  } else {
    const batPosition = newGameState.mark_positions.bat
    newGameState.mark_positions.bat = currentPlayerMark
    newGameState.card_positions[currentPlayerNumber].mark = batPosition
  }

  newGameState.players[token].player_history = {
    ...newGameState.players[token].player_history,
    scene_title: title,
    vampires, 
    new_vampire: newVampire, 
    mark_of_bat: [currentPlayerNumber]
  }

  return generateRoleInteraction(newGameState, token, {
    private_message: ['interaction_vampires', 'interaction_mark_of_bat'],
    icon: 'bat',
    uniqueInformations: { vampires, new_vampire: newVampire, mark_of_bat: [currentPlayerNumber] },
  })
}
