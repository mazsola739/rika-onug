import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleAction, getPlayerNumbersByGivenConditions, sawCards, updateCardRoleAndTeam } from '../../sceneUtils'

export const oracleanswerAction = (gamestate, token, title) => {
  const oracleQuestion = gamestate.roles.oracle.question
  const oracleAnswer = gamestate.roles.oracle.answer
  const oracleAftermath = gamestate.roles.oracle.aftermath
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]

  let showCards = []
  let selectable_cards = []
  let selectable_card_limit = { player: 0, center: 0 }
  let privateMessage = []
  let scene_end = true
  let obligatory = false

  switch (oracleQuestion) {
    case 'oracle_guessnumber':
      if (oracleAnswer.includes('success')) {
        gamestate.players[token].card.eyes_open = true
        privateMessage = ['action_oracle_open_you_eyes']
      } else {
        gamestate.players[token].card.player_team = 'oracle'
        updateCardRoleAndTeam(gamestate, currentPlayerNumber, gamestate.positions.card_positions[currentPlayerNumber].card.role, 'oracle')
        privateMessage = ['action_oracle_team']
      }
      break
    case 'oracle_viewplayer':
      gamestate.players[token].card_or_mark_action = true
      showCards = sawCards(gamestate, [`player_${oracleAnswer}`], token)
      privateMessage = ['action_selected_card', formatPlayerIdentifier([`player_${oracleAnswer}`])[0]]
      break
    case 'oracle_alienteam':
      if (oracleAftermath.includes('alienteam_yes')) {
        gamestate.players[token].card.player_team = 'alien'
        privateMessage = ['action_alien_team']
        if (oracleAftermath.includes('alienteam_yes2')) {
          gamestate.players[token].card.player_role = 'ALIEN'
          //      updatePlayerKnownCard(gamestate, token, gamestate.positions.card_positions[currentPlayerNumber].card.id, gamestate.positions.card_positions[currentPlayerNumber].card.role, gamestate.players[token].card.player_role_id, gamestate.positions.card_positions[currentPlayerNumber].card.team)
          updateCardRoleAndTeam(gamestate, currentPlayerNumber, 'ALIEN', 'alien')
          privateMessage = ['action_alien_role']
        }
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_werewolfteam':
      if (oracleAftermath.includes('werewolfteam')) {
        gamestate.players[token].card.player_team = 'werewolf'
        updateCardRoleAndTeam(gamestate, currentPlayerNumber, gamestate.positions.card_positions[currentPlayerNumber].card.role, 'werewolf')
        privateMessage = ['action_werewolf_team']
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_vampireteam':
      if (oracleAftermath.includes('vampireteam')) {
        gamestate.players[token].card.player_team = 'vampire'
        updateCardRoleAndTeam(gamestate, currentPlayerNumber, gamestate.positions.card_positions[currentPlayerNumber].card.role, 'vampire')
        privateMessage = ['action_vampire_team']
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_centerexchange':
      if (oracleAftermath.includes('yes1')) {
        selectable_cards = CENTER_CARD_POSITIONS
        selectable_card_limit = { player: 0, center: 1 }

        privateMessage = ['action_must_one_center']
        scene_end = false
        obligatory = true
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_viewcenter':
      if (oracleAftermath.includes('yes1')) {
        selectable_cards = CENTER_CARD_POSITIONS
        selectable_card_limit = { player: 0, center: 1 }

        privateMessage = ['action_may_one_center']
        scene_end = false
      } else if (oracleAftermath.includes('yes2')) {
        selectable_cards = CENTER_CARD_POSITIONS
        selectable_card_limit = { player: 0, center: 2 }

        privateMessage = ['action_may_two_center']
        scene_end = false
      } else if (oracleAftermath.includes('yes3')) {
        selectable_cards = CENTER_CARD_POSITIONS
        selectable_card_limit = { player: 0, center: 3 }

        privateMessage = ['action_must_three_center']
        scene_end = false
        obligatory = true
      }
      break
  }

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    showCards,
    selectableCards: { selectable_cards, selectable_card_limit },
    scene_end,
    obligatory
  })
}
