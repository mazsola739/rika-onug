import { SCENE } from "../../../constants"
import { formatPlayerIdentifier, generateRoleInteraction } from "../../sceneUtils"
import { validateCardSelection } from "../../validators"

export const temptressResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }
  const scene = []

  const centerVillain = { ...newGamestate.card_positions.center_villain.card }
  const selectedCard = { ...newGamestate.card_positions[selected_card_positions[0]].card }
  newGamestate.card_positions.center_villain.card = selectedCard
  newGamestate.card_positions[selected_card_positions[0]].card = centerVillain

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [selected_card_positions[0], 'center_villain'],
  }

  const messageIdentifiers = formatPlayerIdentifier([selected_card_positions[0], 'center_villain'])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    uniqueInformations: { swap: [selected_card_positions[0], 'center_villain'], evilhand: [selected_card_positions[0]] },
  })

  scene.push({ type: SCENE, title, token, interaction })
  newGamestate.scene = scene

  return newGamestate
}
