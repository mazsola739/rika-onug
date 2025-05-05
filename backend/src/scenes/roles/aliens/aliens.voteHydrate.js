import { repo, repositoryType } from '../../../repository'
import { sendMessageToPlayer } from '../../../utils'
import {
  getPlayerNumbersByGivenConditions,
  getPlayerTokensByPlayerNumber,
  getPlayerNumberWithMatchingToken,
  getCardIdsByPositions,
  generateRoleAction,
  formatPlayerIdentifier,
  getNarrationByTitle,
  createAndSendSceneMessage
} from '../../sceneUtils'

export const aliensVotehydrate = async message => {
  const { room_id, token, selected_vote, title } = message

  try {
    const gamestate = await repo[repositoryType].readGamestate(room_id)

    const aliens = getPlayerNumbersByGivenConditions(gamestate.players, 'alien')
    const aliensTokens = getPlayerTokensByPlayerNumber(gamestate.players, aliens)
    const alienCount = aliens.length
    const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

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
      let viewCards = []
      let new_alien = []
      let new_alien_helper = []
      let message = ''

      switch (randomAlienInstruction) {
        case 'aliens_allview_text':
          gamestate.players[token].card_or_mark_action = true
          if (gamestate.players[token].card.player_original_id === gamestate.positions.card_positions[unanimousPlayerNumber].card.id) {
            gamestate.players[token].card.player_card_id = 87
          }

          showCards = getCardIdsByPositions(gamestate.positions.card_positions, [unanimousPlayerNumber])
          viewCards = [unanimousPlayerNumber]
          message = 'action_saw_card'

          break
        case 'aliens_newalien_text':
          gamestate.positions.card_positions[unanimousPlayerNumber].card.role = 'ALIEN'
          gamestate.positions.card_positions[unanimousPlayerNumber].card.team = 'alien'
          new_alien = [unanimousPlayerNumber]
          message = 'action_turned_newalien'

          break
        case 'aliens_alienhelper_text':
          gamestate.positions.card_positions[unanimousPlayerNumber].card.team = 'alien'
          new_alien_helper = [unanimousPlayerNumber]
          message = 'action_turned_alienhelper'

          break
      }

      aliensTokens.forEach(alienToken => {
        gamestate.players[alienToken].player_history[title] = {
          ...gamestate.players[alienToken].player_history[title],
          viewed_cards: viewCards,
          new_alien,
          new_alien_helper,
          scene_end: true
        }

        const action = generateRoleAction(gamestate, alienToken, {
          private_message: ['action_voted_together', message, formatPlayerIdentifier([unanimousPlayerNumber])[0]],
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
          type: title,
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
