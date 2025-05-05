import { CENTER_CARD_POSITIONS } from '../../../../constants'
import { formatPlayerIdentifier, generateRoleAction, getCardIdsByPositions, getPlayerNumberWithMatchingToken } from '../../../sceneUtils'

export const oracleanswerAction = (gamestate, token, title) => {
  const oracleQuestion = gamestate.oracle.question
  const oracleAnswer = gamestate.oracle.answer
  const oracleAftermath = gamestate.oracle.aftermath
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)

  let showCards = []
  let selectableCards = {}
  let privateMessage = []
  let scene_end = true
  let obligatory = false

  switch (oracleQuestion) {
    case 'oracle_guessnumber_text':
      if (oracleAnswer.includes('success')) {
        gamestate.players[token].card.eyes_open = true
        privateMessage = ['action_oracle_open_you_eyes']
      } else {
        gamestate.players[token].card.player_team = 'oracle'
        gamestate.positions.card_positions[currentPlayerNumber].card.team = 'oracle'
        privateMessage = ['action_oracle_team']
      }
      break
    case 'oracle_viewplayer_text':
      gamestate.players[token].card_or_mark_action = true
      showCards = getCardIdsByPositions(gamestate.positions.card_positions, [`player_${oracleAnswer}`])
      privateMessage = ['action_selected_card', formatPlayerIdentifier([`player_${oracleAnswer}`])[0]]
      break
    case 'oracle_alienteam_text':
      if (oracleAftermath.includes('alienteam_yes')) {
        gamestate.players[token].card.player_team = 'alien'
        privateMessage = ['action_alien_team']
        if (oracleAftermath.includes('alienteam_yes2')) {
          gamestate.players[token].card.player_role = 'ALIEN'
          gamestate.positions.card_positions[currentPlayerNumber].card.role = 'ALIEN'
          gamestate.positions.card_positions[currentPlayerNumber].card.team = 'alien'
          privateMessage = ['action_alien_role']
        }
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_werewolfteam_text':
      if (oracleAftermath.includes('werewolfteam')) {
        gamestate.players[token].card.player_team = 'werewolf'
        gamestate.positions.card_positions[currentPlayerNumber].card.team = 'werewolf'
        privateMessage = ['action_werewolf_team']
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_vampireteam_text':
      if (oracleAftermath.includes('vampireteam')) {
        gamestate.players[token].card.player_team = 'vampire'
        gamestate.positions.card_positions[currentPlayerNumber].card.team = 'vampire'
        privateMessage = ['action_vampire_team']
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_centerexchange_text':
      if (oracleAftermath.includes('yes1')) {
        selectableCards = {
          selectable_cards: CENTER_CARD_POSITIONS,
          selectable_card_limit: { player: 0, center: 1 }
        }
        privateMessage = ['action_must_one_center']
        scene_end = false
        obligatory = true
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_viewcenter_text':
      if (oracleAftermath.includes('yes1')) {
        selectableCards = {
          selectable_cards: CENTER_CARD_POSITIONS,
          selectable_card_limit: { player: 0, center: 1 }
        }
        privateMessage = ['action_may_one_center']
        scene_end = false
      } else if (oracleAftermath.includes('yes2')) {
        selectableCards = {
          selectable_cards: CENTER_CARD_POSITIONS,
          selectable_card_limit: { player: 0, center: 2 }
        }
        privateMessage = ['action_may_two_center']
        scene_end = false
      } else if (oracleAftermath.includes('yes3')) {
        selectableCards = {
          selectable_cards: CENTER_CARD_POSITIONS,
          selectable_card_limit: { player: 0, center: 3 }
        }
        privateMessage = ['action_must_three_center']
        scene_end = false
        obligatory = true
      }
      break
  }

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_cards: showCards,
    scene_end,
    obligatory
  }

  return generateRoleAction(gamestate, token, {
    private_message: privateMessage,
    showCards,
    selectableCards,
    scene_end,
    obligatory
  })
}
