import { ALIENS_VOTE } from '../../../constants'
import { repo, repositoryType } from '../../../repository'
import { sendMessageToPlayer } from '../../../utils'
import { getPlayerNumbersByGivenConditions, getPlayerTokensByPlayerNumber, generateRoleAction, formatPlayerIdentifier, getNarrationByTitle, createAndSendSceneMessage, sawCards, updateCardRoleAndTeam } from '../../sceneUtils'

export const aliensVotehydrate = async message => {
  const { room_id, token, selected_vote, title } = message

  try {
    const gamestate = await repo[repositoryType].readGamestate(room_id)

    const aliens = getPlayerNumbersByGivenConditions(gamestate, 'alien')
    const aliensTokens = getPlayerTokensByPlayerNumber(gamestate.players, aliens) //TODO similar function as getPlayerNumbersByGivenConditions
    const alienCount = aliens.length
    const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

    const alien_votes = { ...gamestate.roles.aliens.alien_votes }

    Object.keys(alien_votes).forEach(key => {
      const voters = alien_votes[key]
      const index = voters.indexOf(currentPlayerNumber)
      if (index !== -1) {
        voters.splice(index, 1)
      }
    })

    selected_vote.forEach(vote => {
      if (!alien_votes[vote]) {
        alien_votes[vote] = []
      }
      if (!alien_votes[vote].includes(currentPlayerNumber)) {
        alien_votes[vote].push(currentPlayerNumber)
      }
    })

    gamestate.players[token].alien_vote = selected_vote
    gamestate.roles.aliens.alien_votes = alien_votes

    const unanimousVote = Object.entries(alien_votes).find(([, voters]) => voters.length === alienCount)

    if (unanimousVote) {
      const unanimousPlayerNumber = unanimousVote[0]
      const randomAlienInstruction = gamestate.roles.aliens.instruction

      let showCards = []
      let new_alien = []
      let new_alien_helper = []
      let message = ''

      switch (randomAlienInstruction) {
        case 'aliens_allview':
          showCards = sawCards(gamestate, [unanimousPlayerNumber], token)
          message = 'action_saw_card'

          break
        case 'aliens_newalien':
          updateCardRoleAndTeam(gamestate, unanimousPlayerNumber, 'ALIEN', 'alien')
          new_alien = [unanimousPlayerNumber]
          message = 'action_turned_newalien'

          break
        case 'aliens_alienhelper':
          updateCardRoleAndTeam(gamestate, unanimousPlayerNumber, gamestate.positions.card_positions[unanimousPlayerNumber].card.role, 'alien')
          new_alien_helper = [unanimousPlayerNumber]
          message = 'action_turned_alienhelper'

          break
      }

      aliensTokens.forEach(alienToken => {
        gamestate.players[alienToken].player_history[title] = {
          ...gamestate.players[alienToken].player_history[title],
          new_alien,
          new_alien_helper,
          scene_end: true
        }

        const action = generateRoleAction(gamestate, alienToken, title, {
          private_message: ['action_voted_together', message, ...formatPlayerIdentifier([unanimousPlayerNumber])],
          showCards,
          uniqueInformation: { new_alien, new_alien_helper },
          scene_end: true
        })

        const narration = getNarrationByTitle(title, gamestate.scenes.narration)

        createAndSendSceneMessage(gamestate, alienToken, title, action, narration)
      })
    } else {
      aliensTokens.forEach(alienToken => {
        const stillVoteMessage = {
          type: ALIENS_VOTE,
          success: true,
          alien_votes
        }

        sendMessageToPlayer(gamestate.room_id, alienToken, stillVoteMessage)
      })
    }

    await repo[repositoryType].upsertRoomState(gamestate)
  } catch (error) {
    console.error('Error handling alien vote:', error)
  }
}
