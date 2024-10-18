import { MESSAGE } from "../../../constants"
import { webSocketServerConnectionsPerRoom } from "../../../websocket/connections"
import { findMostVoted, formatPlayerIdentifier, getCardIdsByPlayerNumbers, getPlayerTokensByPlayerNumber, generateRoleInteraction } from "../../sceneUtils"

export const aliensVoteResult = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const randomAlienInstruction = newGamestate.alien.instruction
  const mostVotedPlayer = findMostVoted(newGamestate.alien_votes)
  
  let privateMessage = []
  let showCards = []
  let uniqueInformations = {}
  
  if (randomAlienInstruction === 'aliens_allview_text') {
    newGamestate.players[token].card_or_mark_action = true
    privateMessage = ['interaction_saw_card', formatPlayerIdentifier(mostVotedPlayer)[0]]
    showCards = getCardIdsByPlayerNumbers([mostVotedPlayer[0]])
    uniqueInformations = { alienstare: [mostVotedPlayer[0]] }
  } else if (randomAlienInstruction === 'aliens_newalien_text' || randomAlienInstruction === 'aliens_alienhelper_text') {
    uniqueInformations = { babyalien: [mostVotedPlayer[0]] }
    
    const selectedPlayer = getPlayerTokensByPlayerNumber(newGamestate.players, [mostVotedPlayer[0]])
    const selectedPositionCard = newGamestate.card_positions[mostVotedPlayer[0]].card
    
    if (newGamestate.players[token].card.player_original_id === selectedPositionCard.id) {
      newGamestate.players[token].card.player_card_id = 0
    }

    newGamestate.players[selectedPlayer[0]].card.player_team = 'alien'
    newGamestate.card_positions[mostVotedPlayer[0]].card.team = 'alien'
    
    if (randomAlienInstruction === 'aliens_newalien_text') {
      privateMessage = ['interaction_turned_newalien']
      newGamestate.players[selectedPlayer[0]].card.player_role = 'ALIEN'
      newGamestate.card_positions[mostVotedPlayer[0]].card.role = 'ALIEN'
    } else if (randomAlienInstruction === 'aliens_alienhelper_text') {
      privateMessage = ['interaction_turned_alienhelper']
    }

    webSocketServerConnectionsPerRoom[newGamestate.room_id][mostVotedPlayer[0]].send(
      JSON.stringify({
        type: MESSAGE,
        message: (randomAlienInstruction === 'aliens_newalien_text') ? ['interaction_alien_role'] : ['interaction_alien_team'],
      })
    )
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    ...uniqueInformations,
  }
  
  return generateRoleInteraction(newGamestate, token, {
    private_message: privateMessage,
    showCards,
    uniqueInformations,
  })
}
