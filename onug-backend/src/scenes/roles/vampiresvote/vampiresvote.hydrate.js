import { VAMPIRES_VOTE } from '../../../constants'
import { readGamestate, upsertRoomState } from '../../../repository'
import { sendMessageToPlayer } from '../../../websocket'
import {
  createAndSendSceneMessage,
  formatPlayerIdentifier,
  generateRoleInteraction,
  getNarrationByTitle,
  getPlayerNumberWithMatchingToken,
  getPlayerTokenByPlayerNumber,
  getPlayerTokensByPlayerNumber,
  getVampirePlayerNumbersByRoleIds
} from '../../sceneUtils'

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

    newGamestate.players[token].vampire_vote = selected_vote
    newGamestate.vampire_votes = vampire_votes

    const unanimousVote = Object.entries(vampire_votes).find(([, voters]) => voters.length === vampireCount)

    if (unanimousVote) {
      const unanimousPlayerNumber = unanimousVote[0]

      const vampirePosition = newGamestate.mark_positions.vampire
      const selectedPosition = newGamestate.card_positions[unanimousPlayerNumber].mark

      const victimToken = getPlayerTokenByPlayerNumber(newGamestate.players, unanimousPlayerNumber)
      const isSwappedAlready = vampirePosition === newGamestate.players[victimToken].card.player_mark

      if (!isSwappedAlready) {
        newGamestate.mark_positions.vampire = selectedPosition
        newGamestate.card_positions[unanimousPlayerNumber].mark = vampirePosition
      }

      newGamestate.players[token].card_or_mark_action = true

      vampiresTokens.forEach(vampireToken => {
        newGamestate.players[vampireToken].player_history[title] = {
          ...newGamestate.players[vampireToken].player_history[title],
          mark_of_vampire: [unanimousPlayerNumber],
          scene_end: true
        }

        const interaction = generateRoleInteraction(newGamestate, vampireToken, {
          private_message: ['interaction_voted_together', 'interaction_mark_of_vampire', formatPlayerIdentifier([unanimousPlayerNumber])[0]],
          scene_end: true
        })

        const narration = getNarrationByTitle(title, newGamestate.narration)

        createAndSendSceneMessage(newGamestate, vampireToken, title, interaction, narration)
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
