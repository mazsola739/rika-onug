import { repo, repositoryType } from '../../../repository'
import { sendMessageToPlayer } from '../../../utils'
import { createAndSendSceneMessage, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerNumbersByGivenConditions, getPlayerNumberWithMatchingToken, getPlayerTokensByPlayerNumber } from '../../sceneUtils'

export const vampiresVotehydrate = async message => {
  const { room_id, token, selected_vote, title } = message

  try {
    const gamestate = await repo[repositoryType].readGamestate(room_id)

    const vampires = getPlayerNumbersByGivenConditions(gamestate.players, 'vampire')
    const vampiresTokens = getPlayerTokensByPlayerNumber(gamestate.players, vampires)
    const vampireCount = vampires.length
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

    const vampire_votes = { ...gamestate.roles.vampires.vampire_votes }

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
    gamestate.roles.vampires.vampire_votes = vampire_votes

    const unanimousVote = Object.entries(vampire_votes).find(([, voters]) => voters.length === vampireCount)

    if (unanimousVote) {
      const unanimousPlayerNumber = unanimousVote[0]

      const vampirePosition = gamestate.positions.mark_positions.vampire
      const selectedPosition = gamestate.positions.card_positions[unanimousPlayerNumber].mark

      const isSwappedAlready = vampirePosition === selectedPosition

      if (!isSwappedAlready) {
        gamestate.positions.mark_positions.vampire = selectedPosition
        gamestate.positions.card_positions[unanimousPlayerNumber].mark = vampirePosition
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

        const narration = getNarrationByTitle(title, gamestate.scenes.narration)

        createAndSendSceneMessage(gamestate, vampireToken, title, action, narration)
      })
    } else {
      vampiresTokens.forEach(vampireToken => {
        const stillVoteMessage = {
          type: title,
          success: true,
          vampire_votes
        }

        sendMessageToPlayer(gamestate.room_id, vampireToken, stillVoteMessage)
      })
    }

    await repo[repositoryType].upsertRoomState(gamestate)
  } catch (error) {
    console.error('Error handling vampire vote:', error)
  }
}
