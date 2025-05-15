import { repo, repositoryType } from '../../../repository'
import { sendMessageToPlayer } from '../../../utils'
import { createAndSendSceneMessage, formatPlayerIdentifier, generateRoleAction, getNarrationByTitle, getPlayerNumbersByGivenConditions, getPlayerTokensByPlayerNumber } from '../../sceneUtils'

//TODO fix
export const empathVotehydrate = async message => {
  const { room_id, token, selected_vote, title } = message

  const gamestate = await repo[repositoryType].readGamestate(room_id)

  const active_player_numbers = gamestate.roles[title.toLowerCase()].active_player_numbers
  const empath = getPlayerNumbersByGivenConditions(gamestate, 'empath', token)
  const doppelgangerEmpath = getPlayerNumbersByGivenConditions(gamestate, 'doppelgangerEmpath', token)

  const empathTokens = getPlayerTokensByPlayerNumber(gamestate.players, empath)
  const doppelgangerEmpathTokens = getPlayerTokensByPlayerNumber(gamestate.players, doppelgangerEmpath)
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  const empath_votes = { ...gamestate.roles[title.toLowerCase()].empath_votes }

  Object.keys(empath_votes).forEach(key => {
    const voters = empath_votes[key]
    const index = voters.indexOf(currentPlayerNumber)
    if (index !== -1) {
      voters.splice(index, 1)
    }
  })

  selected_vote.forEach(vote => {
    if (!empath_votes[vote]) {
      empath_votes[vote] = []
    }
    if (!empath_votes[vote].includes(currentPlayerNumber)) {
      empath_votes[vote].push(currentPlayerNumber)
    }
  })

  gamestate.players[token].empath_vote = selected_vote
  gamestate.roles[title.toLowerCase()].empath_votes = empath_votes

  // Fix: Safely check if all active players have voted
  const allVoted = active_player_numbers.every(active_player => {
    const playerToken = getPlayerTokensByPlayerNumber(gamestate.players, [active_player])[0]
    const player = gamestate.players[playerToken]
    return Array.isArray(player?.empath_vote) && player.empath_vote.length > 0
  })

  if (allVoted) {
    if (title === 'EMPATH' && empathTokens.length > 0) {
      empathTokens.forEach(empathToken => {
        const action = generateRoleAction(gamestate, empathToken, {
          private_message: ['action_voted_together', 'action_empath_vote', ...formatPlayerIdentifier(selected_vote)],
          uniqueInformation: { empath_votes },
          scene_end: true
        })

        const narration = getNarrationByTitle(title, gamestate.scenes.narration)

        createAndSendSceneMessage(gamestate, empathToken, title, action, narration)
      })
    } else if (title === 'DOPPELGANGER EMPATH' && doppelgangerEmpathTokens.length > 0) {
      doppelgangerEmpathTokens.forEach(doppelgangerEmpathToken => {
        const action = generateRoleAction(gamestate, doppelgangerEmpathToken, {
          private_message: ['action_voted_together', 'action_empath_vote', ...formatPlayerIdentifier(selected_vote)],
          uniqueInformation: { empath_votes },
          scene_end: true
        })

        const narration = getNarrationByTitle(title, gamestate.scenes.narration)

        createAndSendSceneMessage(gamestate, doppelgangerEmpathToken, title, action, narration)
      })
    }
  } else {
    if (title === 'EMPATH' && empathTokens.length > 0) {
      empathTokens.forEach(empathToken => {
        sendMessageToPlayer(gamestate.room_id, empathToken, {
          type: title,
          success: true,
          empath_votes
        })
      })
    }
    if (title === 'DOPPELGANGER EMPATH' && doppelgangerEmpathTokens.length > 0) {
      doppelgangerEmpathTokens.forEach(doppelgangerEmpathToken => {
        sendMessageToPlayer(gamestate.room_id, doppelgangerEmpathToken, {
          type: title,
          success: true,
          empath_votes
        })
      })
    }
  }

  await repo[repositoryType].upsertRoomState(gamestate)
}
