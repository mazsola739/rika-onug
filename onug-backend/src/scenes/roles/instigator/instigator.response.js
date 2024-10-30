import { SCENE } from '../../../constants'
import { formatPlayerIdentifier, generateRoleInteraction, getPlayerNumberWithMatchingToken } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const instigatorResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const traitorPosition = newGamestate.doppelganger_mark_positions.traitor
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.traitor = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = traitorPosition
  } else {
    const traitorPosition = newGamestate.mark_positions.traitor
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.traitor = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = traitorPosition
  }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

  if (currentPlayerNumber === selected_mark_positions[0]) {
    newGamestate.players[token].card.player_mark = 'mark_of_traitor'
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_traitor: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_traitor', formatPlayerIdentifier(selected_mark_positions)[0]],
  })

  Object.keys(interaction).length !== 0 && scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
