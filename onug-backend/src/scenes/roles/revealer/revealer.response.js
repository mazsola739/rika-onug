import { GOOD_GUY } from '../../../constants'
import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

//TODO better response message
export const revealerResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const selectedPositionCard = newGamestate.card_positions[selected_card_positions[0]].card
  const revealedCard = getCardIdsByPositions(newGamestate.card_positions, [selected_card_positions[0]])
  const isTown = revealedCard.every(card => GOOD_GUY.includes(Object.values(card)[0]))

  if (newGamestate.players[token].card?.original_id === selectedPositionCard.id) {
    newGamestate.players[token].card.player_card_id = 87
  }

  newGamestate.players[token].card_or_mark_action = true

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title]
  }

  if (isTown) {
    newGamestate.flipped.push(revealedCard[0])
    newGamestate.players[token].player_history[title].flipped_cards = revealedCard
  } else {
    newGamestate.players[token].player_history[title].show_cards = revealedCard
  }

  const interaction = generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_flipped_card', formatPlayerIdentifier(selected_card_positions)[0]],
    showCards: revealedCard
  })

  const narration = getNarrationByTitle(title, newGamestate.narration)

  createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

  return newGamestate
}
