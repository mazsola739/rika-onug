import { VOTE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { addVote, formatPlayerIdentifier, generateRoleInteraction, getAlienPlayerNumbersByRoleIds, getCardIdsByPositions, getNarrationByTitle, getPlayerTokensByPlayerNumber } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'
import { validateCardSelection } from '../../validators'

export const aliensResponse = (gamestate, token, selected_card_positions, title) => {
  if (!validateCardSelection(selected_card_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const narration = getNarrationByTitle(title, gamestate.narration)
  const randomAlienInstruction = gamestate.alien.instruction
  const aliens = getAlienPlayerNumbersByRoleIds(gamestate.players)

  if (randomAlienInstruction === 'aliens_view_text') {
    const showCards = getCardIdsByPositions(gamestate.card_positions, [selected_card_positions[0]])
    const selectedPositionCard = gamestate.card_positions[selected_card_positions[0]].card

    if (gamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      gamestate.players[token].card.player_card_id = 87
    }

    const private_message = ['interaction_saw_card', formatPlayerIdentifier(selected_card_positions)[0]]

    gamestate.players[token].player_history[title] = {
      ...gamestate.players[token].player_history[title],
      private_message,
      viewed_cards: showCards
    }

    const interaction = generateRoleInteraction(gamestate, token, {
      private_message,
      showCards,
      uniqueInformations: { aliens }
    })

    createAndSendSceneMessage(gamestate, token, title, interaction, narration)

    return gamestate
  }

  const votes = addVote(gamestate.players[token].player_number, selected_card_positions[0], gamestate.alien_votes)

  gamestate.players[token].alien_vote = selected_card_positions[0]
  gamestate.alien_votes = votes

  const alienTokens = getPlayerTokensByPlayerNumber(gamestate.players, aliens)
  //TODO better vote
  alienTokens.forEach(alienToken => {
    webSocketServerConnectionsPerRoom[gamestate.room_id][alienToken].send(
      JSON.stringify({
        type: VOTE,
        votes
      })
    )
  })

  const private_message = ['interaction_voted', formatPlayerIdentifier(selected_card_positions)[0]]

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    private_message,
    aliens,
    alien_vote: [selected_card_positions[0]]
  }

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message,
    uniqueInformations: { aliens }
  })

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
