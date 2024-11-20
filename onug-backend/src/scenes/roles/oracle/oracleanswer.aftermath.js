import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleInteraction, getCardIdsByPositions, getNarrationByTitle, getPlayerNumberWithMatchingToken, getRandomNumber } from '../../sceneUtils'
import { createAndSendSceneMessage } from '../../sceneUtils/createAndSendSceneMessage'

export const oracleAnswerAftermath = (gamestate, token, title) => {
  const oracleQuestion = gamestate.oracle.question
  const oracleAnswer = gamestate.oracle.answer
  const oracleAftermath = gamestate.oracle.aftermath
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const currentPlayerCard = {
    ...gamestate.card_positions[currentPlayerNumber].card
  }

  let showCards = []
  let limit = 0
  let privateMessage = []

  switch (oracleQuestion) {
    case 'oracle_guessnumber_text':
      if (oracleAftermath.includes('success')) {
        gamestate.oracle_eyes_open = true
        privateMessage = ['interaction_oracle_open_you_eyes']
      } else {
        gamestate.oracle_target = true

        gamestate.players[token].card.player_team = 'oracle'
        currentPlayerCard.team = 'oracle'
        privateMessage = ['interaction_oracle_team']
      }
      break
    case 'oracle_viewplayer_text':
      gamestate.players[token].card_or_mark_action = true

      if (oracleAftermath.includes('yes')) {
        showCards = getCardIdsByPositions(gamestate.card_positions, [`player_${oracleAnswer}`])
      } else {
        const randomPlayerNumber = getRandomNumber(1, gamestate.total_players)
        showCards = getCardIdsByPositions(gamestate.card_positions, [`player_${randomPlayerNumber}`])
      }

      privateMessage = ['interaction_selected_card', formatPlayerIdentifier(showCards)]
      break
    case 'oracle_alienteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        gamestate.players[token].card.player_team = 'alien'
        privateMessage = ['interaction_alien_team']
        if (oracleAftermath.includes('yes2')) {
          gamestate.players[token].card.player_role = 'ALIEN'
          currentPlayerCard.role = 'ALIEN'
          currentPlayerCard.team = 'alien'
          privateMessage = ['interaction_alien_role']
        }
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_werewolfteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        gamestate.players[token].card.player_team = 'werewolf'
        currentPlayerCard.team = 'werewolf'
        privateMessage = ['interaction_werewolf_team']
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_vampireteam_text':
      if (!oracleAftermath.includes('teamswitch_yes')) {
        gamestate.players[token].card.player_team = 'vampire'
        currentPlayerCard.team = 'vampire'
        privateMessage = ['interaction_vampire_team']
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_centerexchange_text':
      if (!oracleAftermath.includes('yes2')) {
        limit = 1
        privateMessage = ['interaction_must_one_center']
      } else {
        privateMessage = ['interaction_stay_oracle']
      }
      break
    case 'oracle_viewcenter_text':
      if (oracleAftermath.includes('yes1')) {
        limit = 1
        privateMessage = ['interaction_must_one_center']
      } else if (oracleAftermath.includes('yes2')) {
        limit = 2
        privateMessage = ['interaction_must_two_center']
      } else if (oracleAftermath.includes('yes3')) {
        limit = 3
        privateMessage = ['interaction_must_three_center']
      }
      break
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: showCards,
    selectableCards: {
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: limit }
    }
  }

  const interaction = generateRoleInteraction(gamestate, token, {
    private_message: privateMessage,
    showCards,
    selectableCards: {
      selectable_cards: CENTER_CARD_POSITIONS,
      selectable_card_limit: { player: 0, center: limit }
    }
  })

  const narration = getNarrationByTitle(title, gamestate.narration)

  createAndSendSceneMessage(gamestate, token, title, interaction, narration)

  return gamestate
}
