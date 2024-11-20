import { formatPlayerIdentifier, generateRoleInteraction, getPlayerNumberWithMatchingToken, getVampirePlayerNumbersByRoleIds } from '../../sceneUtils'
import { getVampirePlayerNumbersByMark } from './renfield.utils'

//TODO if no vampire he is villager
export const renfieldInteraction = (gamestate, token, title) => {
  const vampires = getVampirePlayerNumbersByRoleIds(gamestate.players)
  const newVampire = getVampirePlayerNumbersByMark(gamestate.players)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const currentPlayerMark = gamestate.card_positions[currentPlayerNumber].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const batPosition = gamestate.doppelganger_mark_positions.bat
    gamestate.doppelganger_mark_positions.bat = currentPlayerMark
    gamestate.card_positions[currentPlayerNumber].mark = batPosition
    gamestate.card_positions[currentPlayerNumber].mark = batPosition
  } else {
    const batPosition = gamestate.mark_positions.bat
    gamestate.mark_positions.bat = currentPlayerMark
    gamestate.card_positions[currentPlayerNumber].mark = batPosition
  }

  gamestate.players[token].card.player_mark = 'mark_of_the_bat'

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    vampires,
    new_vampire: newVampire,
    mark_of_bat: [currentPlayerNumber],
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier(vampires)
  const privateMessage = vampires.length > 0 ? ['interaction_vampires', ...messageIdentifiers] : ['interaction_no_vampires']
  ;('')
  return generateRoleInteraction(gamestate, token, {
    private_message: [...privateMessage, 'interaction_mark_of_bat'],
    uniqueInformations: { vampires, new_vampire: newVampire },
    scene_end: true
  })
}
