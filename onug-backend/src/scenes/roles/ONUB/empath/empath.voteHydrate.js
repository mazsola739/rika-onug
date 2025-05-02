import { repo, repositoryType } from "../../../../repository"
import { getPlayerTokensByPlayerNumber, getPlayerNumberWithMatchingToken } from "../../../sceneUtils"
import { randomEmpathInstructions } from "./empath.constants"

export const empathVotehydrate = async (ws, message) => {
  const { room_id, token, selected_vote, title } = message

  try {
    const gamestate = await repo[repositoryType].readGamestate(room_id)

    const emapths = [0] // Assuming Empath is player 0; adjust logic as needed
    const emapthsTokens = getPlayerTokensByPlayerNumber(gamestate.players, emapths)
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    const emapth_votes = { ...gamestate.emapth_votes }

    // Clear previous votes from the current player
    Object.keys(emapth_votes).forEach(key => {
      const voters = emapth_votes[key]
      const index = voters.indexOf(currentPlayerNumber)
      if (index !== -1) {
        voters.splice(index, 1)
      }
    })

    // Record new votes
    selected_vote.forEach(vote => {
      if (!emapth_votes[vote]) {
        emapth_votes[vote] = []
      }
      if (!emapth_votes[vote].includes(currentPlayerNumber)) {
        emapth_votes[vote].push(currentPlayerNumber)
      }
    })

    gamestate.players[token].emapth_vote = selected_vote
    gamestate.emapth_votes = emapth_votes

    // Generate result messages for the Empath
    const resultMessages = Object.entries(emapth_votes).map(([vote, voters]) => {
      const instructionIndex = parseInt(vote, 10) - 1
      const instructionKey = randomEmpathInstructions[instructionIndex]
      return `${instructionKey}_result: ${voters.join(', ')}`
    })

    /* TODO FIX!!!!!  emapthsTokens.forEach(emapthToken => {
      const stillVoteMessage = {
        type: title,
        success: true,
        emapth_votes,
        resultMessages
      }

      sendMessageToPlayer(gamestate.room_id, emapthToken, stillVoteMessage) 
    })*/

    await repo[repositoryType].upsertRoomState(gamestate)
  } catch (error) {
    console.error('Error handling emapth vote:', error)
  }
}
