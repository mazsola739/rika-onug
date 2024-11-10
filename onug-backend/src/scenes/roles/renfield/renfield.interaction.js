import { generateRoleInteraction, getPlayerNumberWithMatchingToken, getVampirePlayerNumbersByRoleIds } from '../../sceneUtils'
import { getVampirePlayerNumbersByMark } from './renfield.utils'

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
    mark_of_bat: [currentPlayerNumber],
    scene_end: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_vampires', 'interaction_mark_of_bat'],
    uniqueInformations: { vampires, new_vampire: newVampire },
    scene_end: true
  })
}
