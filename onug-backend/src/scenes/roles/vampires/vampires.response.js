import { VAMPIRE_VOTE } from '../../../constants'
import { sendMessageToPlayer } from '../../../websocket'
import {
  createAndSendSceneMessage,
  formatPlayerIdentifier,
  generateRoleInteraction,
  getNarrationByTitle,
  getNonVampirePlayerNumbersByRoleIds,
  getPlayerNumberWithMatchingToken,
  getPlayerTokensByPlayerNumber,
  getVampirePlayerNumbersByRoleIds
} from '../../sceneUtils'
import { validateMarkSelection } from '../../validators'

export const vampiresResponse = (gamestate, token, selected_mark_positions, title) => {
  if (!validateMarkSelection(selected_mark_positions, gamestate.players[token].player_history, title)) {
    return gamestate
  }

  const newGamestate = { ...gamestate }

  const vampires = getVampirePlayerNumbersByRoleIds(newGamestate.players)
  const vampireTokens = getPlayerTokensByPlayerNumber(newGamestate.players, vampires)
  const nonVampires = getNonVampirePlayerNumbersByRoleIds(newGamestate)
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const votedPlayerNumber = selected_mark_positions[0]

  const vampire_votes = { ...newGamestate.vampire_votes }

  if (!vampire_votes[votedPlayerNumber]) {
    vampire_votes[votedPlayerNumber] = []
  }
  Object.keys(vampire_votes).forEach(key => {
    const voters = vampire_votes[key]
    const index = voters.indexOf(currentPlayerNumber)
    if (index !== -1) {
      vampire_votes[key].splice(index, 1)
    }
  })
  if (!vampire_votes[votedPlayerNumber].includes(currentPlayerNumber)) {
    vampire_votes[votedPlayerNumber].push(currentPlayerNumber)
  }

  newGamestate.players[token].vampire_vote = votedPlayerNumber
  newGamestate.vampire_votes = vampire_votes

  const message = {
    type: VAMPIRE_VOTE,
    vampire_votes
  }

  vampireTokens.forEach(vampireToken => {
    sendMessageToPlayer(newGamestate.room_id, vampireToken, message)
  })

  const voteCounts = Object.entries(vampire_votes)
  const allVotedTheSame = voteCounts.every(([, voters]) => voters.length === vampires.length)

  if (allVotedTheSame) {
    const voteResultPlayerNumber = voteCounts[0][0]

    const vampirePosition = newGamestate.mark_positions.vampire
    const selectedPosition = newGamestate.card_positions[voteResultPlayerNumber].mark

    newGamestate.mark_positions.vampire = selectedPosition
    newGamestate.card_positions[voteResultPlayerNumber].mark = vampirePosition

    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      mark_of_vampire: [voteResultPlayerNumber],
      scene_end: true
    }

    return generateRoleInteraction(newGamestate, token, {
      private_message: ['interaction_mark_of_vampire', formatPlayerIdentifier([voteResultPlayerNumber])[0]],
      scene_end: true
    })
  } else {
    newGamestate.players[token].player_history[title] = {
      ...newGamestate.players[token].player_history[title],
      vampires,
      selectable_marks: nonVampires,
      selectable_mark_limit: { mark: 1 },
      obligatory: true
    }

    const interaction = generateRoleInteraction(newGamestate, token, {
      private_message: ['private_message'],
      selectableMarks: {
        selectable_marks: nonVampires,
        selectable_mark_limit: { mark: 1 }
      },
      uniqueInformations: { vampires },
      obligatory: true
    })

    const narration = getNarrationByTitle(title, newGamestate.narration)

    createAndSendSceneMessage(newGamestate, token, title, interaction, narration)

    return newGamestate
  }
}
