import { VAMPIRES_VOTE } from '../../../constants'
import { readGamestate, upsertRoomState } from '../../../repository'
import { sendMessageToPlayer } from '../../../websocket'
import { createAndSendSceneMessage, generateRoleInteraction, getPlayerNumberWithMatchingToken, getPlayerTokensByPlayerNumber, getVampirePlayerNumbersByRoleIds } from '../../sceneUtils'

export const vampiresvoteHydrate = async message => {
  const { room_id, token, selected_vote, title } = message

  try {
    const gamestate = await readGamestate(room_id)

    const newGamestate = { ...gamestate }

    const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
    const vampiresTokens = getPlayerTokensByPlayerNumber(newGamestate.players, vampires)
    const vampireCount = vampires.length
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)

    const vampire_votes = { ...newGamestate.vampire_votes }

    if (!vampire_votes[selected_vote]) {
      vampire_votes[selected_vote] = []
    }

    Object.keys(vampire_votes).forEach(key => {
      const voters = vampire_votes[key]
      const index = voters.indexOf(currentPlayerNumber)
      if (index !== -1) {
        voters.splice(index, 1)
      }
    })

    if (!vampire_votes[selected_vote].includes(currentPlayerNumber)) {
      vampire_votes[selected_vote].push(currentPlayerNumber)
    }

    newGamestate.players[token].vampire_vote = selected_vote
    newGamestate.vampire_votes = vampire_votes

    const unanimousVote = Object.entries(vampire_votes).find(([, voters]) => voters.length === vampireCount)

    if (unanimousVote) {
      const unanimousPlayerNumber = unanimousVote[0]

      vampiresTokens.forEach(vampireToken => {
        newGamestate.players[vampireToken].player_history[title] = {
          ...newGamestate.players[vampireToken].player_history[title],
          selected_mark: [unanimousPlayerNumber],
          vote: false,
          scene_end: true
        }
        const interaction = generateRoleInteraction(newGamestate, vampireToken, {
          private_message: ['interaction_must_one_any_non_vampire'],
          uniqueInformations: { vote: false, selected_marks: [unanimousPlayerNumber] },
          scene_end: true
        })

        createAndSendSceneMessage(newGamestate, vampireToken, title, interaction)
      })
    } else {
      vampiresTokens.forEach(vampireToken => {
        const stillVoteMessage = {
          type: VAMPIRES_VOTE,
          success: true,
          vampire_votes
        }

        sendMessageToPlayer(newGamestate.room_id, vampireToken, stillVoteMessage)
      })
    }

    await upsertRoomState(newGamestate)
  } catch (error) {
    console.error('Error handling vampire vote:', error)
  }
}
