import { SCENE } from '../../../constants'
import { generateRoleInteraction, formatPlayerIdentifier } from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const thecountResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }
  
  const newGamestate = { ...gamestate }
  const scene = []

  if (gamestate.players[token].card.player_original_id === 1) {
    const fearPosition = newGamestate.doppelganger_mark_positions.fear
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.doppelganger_mark_positions.fear = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = fearPosition
  } else {
    const fearPosition = newGamestate.mark_positions.fear
    const selectedPosition = newGamestate.card_positions[selected_mark_positions[0]].mark

    newGamestate.mark_positions.fear = selectedPosition
    newGamestate.card_positions[selected_mark_positions[0]].mark = fearPosition
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    mark_of_fear: [selected_mark_positions[0]],
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_mark_of_fear', formatPlayerIdentifier(selected_mark_positions)[0]],
    uniqueInformations: { mark_of_fear: [selected_mark_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
