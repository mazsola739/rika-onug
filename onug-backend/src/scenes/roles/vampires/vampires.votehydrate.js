import { VAMPIRES } from '../../../constants'
import { readGamestate, upsertRoomState } from '../../../repository'
import { sendMessageToPlayer } from '../../../utils'
import { createAndSendSceneMessage, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerNumberWithMatchingToken, getPlayerTokensByPlayerNumber } from '../../sceneUtils'

export const vampiresVotehydrate = async message => {
  const { room_id, token, selected_vote, title } = message

  try {
    const gamestate = await readGamestate(room_id)

    //TODO FIX THIS
    const vampires = [0]
    const vampiresTokens = getPlayerTokensByPlayerNumber(gamestate.players, vampires)
    const vampireCount = vampires.length
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    const vampire_votes = { ...gamestate.vampire_votes }

    Object.keys(vampire_votes).forEach(key => {
      const voters = vampire_votes[key]
      const index = voters.indexOf(currentPlayerNumber)
      if (index !== -1) {
        voters.splice(index, 1)
      }
    })

    selected_vote.forEach(vote => {
      if (!vampire_votes[vote]) {
        vampire_votes[vote] = []
      }
      if (!vampire_votes[vote].includes(currentPlayerNumber)) {
        vampire_votes[vote].push(currentPlayerNumber)
      }
    })

    gamestate.players[token].vampire_vote = selected_vote
    gamestate.vampire_votes = vampire_votes

    const unanimousVote = Object.entries(vampire_votes).find(([, voters]) => voters.length === vampireCount)

    if (unanimousVote) {
      const unanimousPlayerNumber = unanimousVote[0]

      const vampirePosition = gamestate.mark_positions.vampire
      const selectedPosition = gamestate.card_positions[unanimousPlayerNumber].mark

      const isSwappedAlready = vampirePosition === selectedPosition

      if (!isSwappedAlready) {
        gamestate.mark_positions.vampire = selectedPosition
        gamestate.card_positions[unanimousPlayerNumber].mark = vampirePosition
      }

      gamestate.players[token].card_or_mark_action = true

      vampiresTokens.forEach(vampireToken => {
        gamestate.players[vampireToken].player_history[title] = {
          ...gamestate.players[vampireToken].player_history[title],
          mark_of_vampire: [unanimousPlayerNumber],
          scene_end: true
        }

        const action = generateRoleAction(gamestate, vampireToken, {
          private_message: ['action_voted_together', 'action_mark_of_vampire', formatPlayerIdentifier([unanimousPlayerNumber])[0]],
          scene_end: true
        })

        const narration = getNarrationByTitle(title, gamestate.narration)

        createAndSendSceneMessage(gamestate, vampireToken, title, action, narration)
      })
    } else {
      vampiresTokens.forEach(vampireToken => {
        const stillVoteMessage = {
          type: VAMPIRES,
          success: true,
          vampire_votes
        }

        sendMessageToPlayer(gamestate.room_id, vampireToken, stillVoteMessage)
      })
    }

    await upsertRoomState(gamestate)
  } catch (error) {
    console.error('Error handling vampire vote:', error)
  }
}
