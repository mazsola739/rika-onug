import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

//TODO if no vampire he is villager
export const renfieldAction = (gamestate, token, title) => {
  const vampires = getPlayerNumbersByGivenConditions(gamestate.players, 'vampires')
  const new_vampire = getPlayerNumbersByGivenConditions(gamestate.players, 'vampireByMark')
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]
  const currentPlayerMark = gamestate.positions.card_positions[currentPlayerNumber].mark

  if (gamestate.players[token].card.player_original_id === 1) {
    const batPosition = gamestate.positions.doppelganger_mark_positions.bat
    gamestate.positions.doppelganger_mark_positions.bat = currentPlayerMark
    gamestate.positions.card_positions[currentPlayerNumber].mark = batPosition
    gamestate.positions.card_positions[currentPlayerNumber].mark = batPosition
  } else {
    const batPosition = gamestate.positions.mark_positions.bat
    gamestate.positions.mark_positions.bat = currentPlayerMark
    gamestate.positions.card_positions[currentPlayerNumber].mark = batPosition
  }

  gamestate.players[token].card.player_mark = 'mark_of_the_bat'

  const messageIdentifiers = formatPlayerIdentifier(vampires)
  const privateMessage = vampires.length > 0 ? ['action_vampires', ...messageIdentifiers, 'POINT'] : ['action_no_vampires']
  ;('')
  return generateRoleAction(gamestate, token, title, {
    private_message: [...privateMessage, 'action_mark_of_bat'],
    uniqueInformation: { vampires, new_vampire, mark_of_bat: [currentPlayerNumber]},
    scene_end: true
  })
}
