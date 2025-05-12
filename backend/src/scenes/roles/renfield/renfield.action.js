import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions, updateMark, updatePlayerKnownMark } from '../../sceneUtils'

//TODO if no vampire he is villager
export const renfieldAction = (gamestate, token, title) => {
  const vampires = getPlayerNumbersByGivenConditions(gamestate, 'vampires')
  const new_vampire = getPlayerNumbersByGivenConditions(gamestate, 'vampireByMark')
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  updateMark(gamestate, token, [currentPlayerNumber], ['bat'])

  updatePlayerKnownMark(gamestate, token, 'mark_of_bat')

  const messageIdentifiers = formatPlayerIdentifier(vampires)
  const privateMessage = vampires.length > 0 ? ['action_vampires', ...messageIdentifiers, 'POINT'] : ['action_no_vampires']
  ;('')
  return generateRoleAction(gamestate, token, title, {
    private_message: [...privateMessage, 'action_mark_of_bat'],
    uniqueInformation: { vampires, new_vampire, mark_of_bat: [currentPlayerNumber] },
    scene_end: true
  })
}
