import {
  formatPlayerIdentifier,
  generateRoleInteraction,
  getNarrationByTitle,
  getPlayerNumberWithMatchingToken,
} from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const drunkResponse = (
  gamestate,
  token,
  selected_card_positions,
  title
) => {
  if (
    !validateCardSelection(
      selected_card_positions,
      gamestate.players[token].player_history,
      title
    )
  ) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(
    newGamestate.players,
    token
  )
  const currentPlayerCard = {
    ...newGamestate.card_positions[currentPlayerNumber].card,
  }
  const selectedCard = {
    ...newGamestate.card_positions[selected_card_positions[0]].card,
  }
  newGamestate.card_positions[currentPlayerNumber].card = selectedCard
  newGamestate.card_positions[selected_card_positions[0]].card =
    currentPlayerCard

  newGamestate.players[token].card.player_card_id = 87
  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    swapped_cards: [currentPlayerNumber, selected_card_positions[0]],
    scene_end: true,
  }

  const messageIdentifiers = formatPlayerIdentifier([
    selected_card_positions[0],
    currentPlayerNumber,
  ])

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_swapped_cards', ...messageIdentifiers],
    scene_end: true,
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
