import { ALL_COPY_PLAYER_IDS, SCENE } from '../../constants'
import { getAllPlayerTokens, getVampirePlayerNumbersByRoleIds, getVampirePlayerNumbersByMark, getPlayerNumberWithMatchingToken, getSceneEndTime } from '../../utils'
import { generateRoleInteraction } from '../generate-scene-role-interactions'

//TODO no vampire he is villager
export const renfield = (gamestate, title, hasDoppelganger) => {
  const newGamestate = { ...gamestate }
  const scene = []
  const tokens = getAllPlayerTokens(newGamestate.players)
  const narration = [
    hasDoppelganger
      ? 'doppelganger_renfield_kickoff_text'
      : 'renfield_kickoff_text',
    'renfield_kickoff2_text',
  ]
  const actionTime = 6

  tokens.forEach((token) => {
    let interaction = {}

    const card = newGamestate.players[token].card

    if (card.player_original_id === 38 || (card.player_role_id === 38 && ALL_COPY_PLAYER_IDS.includes(card.player_original_id))) {
      interaction = renfieldInteraction(newGamestate, token, title)
    }

    scene.push({ type: SCENE, title, token, narration, interaction })
  })

  newGamestate.actual_scene.scene_end_time = getSceneEndTime(newGamestate.actual_scene.scene_start_time, actionTime)
  newGamestate.scene = scene

  return newGamestate
}

export const renfieldInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
  const newVampire = getVampirePlayerNumbersByMark(newGamestate.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const currentPlayerMark = newGamestate.card_positions[currentPlayerNumber].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const batPosition = newGamestate.doppelganger_mark_positions.bat
    newGamestate.doppelganger_mark_positions.bat = currentPlayerMark
    newGamestate.card_positions[currentPlayerNumber].mark = batPosition
  } else {
    const batPosition = newGamestate.mark_positions.bat
    newGamestate.mark_positions.bat = currentPlayerMark
    newGamestate.card_positions[currentPlayerNumber].mark = batPosition
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    vampires, 
    new_vampire: newVampire, 
    mark_of_bat: [currentPlayerNumber]
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_vampires', 'interaction_mark_of_bat'],
    icon: 'bat',
    uniqueInformations: { vampires, new_vampire: newVampire, mark_of_bat: [currentPlayerNumber] },
  })
}
