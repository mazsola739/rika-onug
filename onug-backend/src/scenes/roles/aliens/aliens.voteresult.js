import { MESSAGE } from '../../../constants'
import { webSocketServerConnectionsPerRoom } from '../../../websocket/connections'
import { findMostVoted, formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPlayerNumbers, getPlayerTokensByPlayerNumber } from '../../sceneUtils'

//TODO ?  const narration = getNarrationByTitle(title, gamestate.narration) createAndSendSceneMessage(gamestate, token, title, interaction, narration)
export const aliensVoteResult = (gamestate, token, title) => {
  const randomAlienInstruction = gamestate.alien.instruction
  const mostVotedPlayer = findMostVoted(gamestate.alien_votes)

  let privateMessage = []
  let showCards = []
  let uniqueInformations = {}

  if (randomAlienInstruction === 'aliens_allview_text') {
    gamestate.players[token].card_or_mark_action = true
    privateMessage = ['interaction_saw_card', formatPlayerIdentifier(mostVotedPlayer)[0]]
    showCards = getCardIdsByPlayerNumbers([mostVotedPlayer[0]])
    uniqueInformations = { alienstare: [mostVotedPlayer[0]] }
  } else if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
    uniqueInformations = { babyalien: [mostVotedPlayer[0]] }

    const selectedPlayer = getPlayerTokensByPlayerNumber(gamestate.players, [mostVotedPlayer[0]])
    const selectedPositionCard = gamestate.card_positions[mostVotedPlayer[0]].card

    if (gamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      gamestate.players[token].card.player_card_id = 87
    }

    gamestate.players[selectedPlayer[0]].card.player_team = 'alien'
    gamestate.card_positions[mostVotedPlayer[0]].card.team = 'alien'

    if (randomAlienInstruction === 'aliens_newalien_text') {
      privateMessage = ['interaction_turned_newalien']
      gamestate.players[selectedPlayer[0]].card.player_role = 'ALIEN'
      gamestate.card_positions[mostVotedPlayer[0]].card.role = 'ALIEN'
    } else if (randomAlienInstruction === 'aliens_alienhelper_text') {
      privateMessage = ['interaction_turned_alienhelper']
    }

    webSocketServerConnectionsPerRoom[gamestate.room_id][mostVotedPlayer[0]].send(
      JSON.stringify({
        type: MESSAGE,
        message: randomAlienInstruction === 'aliens_newalien_text' ? ['interaction_alien_role'] : ['interaction_alien_team']
      })
    )
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    ...uniqueInformations
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: privateMessage,
    showCards,
    uniqueInformations
  })
}
