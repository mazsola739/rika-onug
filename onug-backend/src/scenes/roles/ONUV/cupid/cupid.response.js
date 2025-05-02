import { getPlayerNumberWithMatchingToken, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, createAndSendSceneMessage } from '../../../sceneUtils'
import { validateMarkSelection } from '../../../validators'

export const cupidResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  if (gamestate.players[token].card.player_original_id === 1) {
    const loveOnePosition = gamestate.doppelganger_mark_positions.love_1
    const loveTwoPosition = gamestate.doppelganger_mark_positions.love_2
    const selectedOnePosition = gamestate.card_positions[selected_mark_positions[0]].mark
    const selectedTwoPosition = gamestate.card_positions[selected_mark_positions[1]].mark

    gamestate.doppelganger_mark_positions.love_1 = selectedOnePosition
    gamestate.doppelganger_mark_positions.love_2 = selectedTwoPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = loveOnePosition
    gamestate.card_positions[selected_mark_positions[1]].mark = loveTwoPosition
  } else {
    const loveOnePosition = gamestate.mark_positions.love_1
    const loveTwoPosition = gamestate.mark_positions.love_2
    const selectedOnePosition = gamestate.card_positions[selected_mark_positions[0]].mark
    const selectedTwoPosition = gamestate.card_positions[selected_mark_positions[1]].mark

    gamestate.mark_positions.love_1 = selectedOnePosition
    gamestate.mark_positions.love_2 = selectedTwoPosition
    gamestate.card_positions[selected_mark_positions[0]].mark = loveOnePosition
    gamestate.card_positions[selected_mark_positions[1]].mark = loveTwoPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  if (currentPlayerNumber === selected_mark_positions[0] || currentPlayerNumber === selected_mark_positions[1]) {
    gamestate.players[token].card.player_mark = 'mark_of_love'
  }

  gamestate.players[token].card_or_mark_action = true

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    mark_of_love: [selected_mark_positions[0], selected_mark_positions[1]],
    scene_end: true
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_mark_positions[0], selected_mark_positions[1]])

  const action = generateRoleAction(gamestate, token, {
    private_message: ['action_mark_of_love', ...messageIdentifiers, 'POINT'],
    scene_end: true
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, action, narration)

  return gamestate
}
