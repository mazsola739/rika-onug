import { formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { getApprenticeAssassinPlayerNumbersByRoleIds } from '../../sceneUtils/getApprenticeAssassinPlayerNumbersByRoleIds'
import { validateMarkSelection } from '../../validators'

export const assassinResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const apprenticeassassins = getApprenticeAssassinPlayerNumbersByRoleIds(gamestate.players)

  if (gamestate.players[token].card.player_original_id === 1) {
    const assassinPosition = gamestate.doppelganger_mark_positions.assassin
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.doppelganger_mark_positions.assassin = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = assassinPosition
  } else {
    const assassinPosition = gamestate.mark_positions.assassin
    const selectedPosition = gamestate.card_positions[selected_mark_positions[0]].mark

    gamestate.mark_positions.assassin = selectedPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = assassinPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    gamestate.players[token].card.player_mark = 'mark_of_assassin'
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_assassin: [selected_mark_positions[0]],
    apprenticeassassins: apprenticeassassins.length > 0 ? apprenticeassassins : [],
    scene_end: true
  }

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_assassin', formatPlayerIdentifier(selected_mark_positions)[0]],
    uniqueInformations: { apprenticeassassins: apprenticeassassins.length > 0 ? apprenticeassassins : [] },
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
