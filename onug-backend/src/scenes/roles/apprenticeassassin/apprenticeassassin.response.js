import { SCENE } from '../../../constants'
import { getPlayerNumberWithMatchingToken, generateRoleInteraction, formatPlayerIdentifier } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const apprenticeassassinResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const assassinPosition = newGamestate.doppelganger_mark_positions.assassin
    const selectedPosition =
      newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.assassin = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark =
      assassinPosition
  } else {
    const assassinPosition = newGamestate.mark_positions.assassin
    const selectedPosition =
      newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.assassin = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark =
      assassinPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    newGamestate.players[token].card.player_mark = 'mark_of_assassin'
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_assassin: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_assassin', formatPlayerIdentifier(selected_mark_positions)[0]],
    uniqueInformations: { mark_of_assassin: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
