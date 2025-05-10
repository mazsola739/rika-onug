import { CENTER_CARD_POSITIONS } from '../../../constants'
import { formatPlayerIdentifier, generateRoleAction, getCardIdsByPositions, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const oracleanswerAction = (gamestate, token, title) => {
  const oracleQuestion = gamestate.roles.oracle.question
  const oracleAnswer = gamestate.roles.oracle.answer
  const oracleAftermath = gamestate.roles.oracle.aftermath
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate.players, 'currentPlayer', [], token)[0]

  let showCards = []
  let selectable_cards = []
  let selectable_card_limit = { player: 0, center: 0 }
  let privateMessage = []
  let scene_end = true
  let obligatory = false

  const setPlayerRoleAndTeam = (team, role = null, message) => {
    gamestate.players[token].card.player_team = team
    gamestate.positions.card_positions[currentPlayerNumber].card.team = team
    if (role) {
      gamestate.players[token].card.player_role = role
      gamestate.positions.card_positions[currentPlayerNumber].card.role = role
    }
    privateMessage = [message]
  }

  const configureRoleAction = (centerLimit, message, mustObligatory = false) => {
    selectable_cards = CENTER_CARD_POSITIONS
    selectable_card_limit = { player: 0, center: centerLimit }
    privateMessage = [message]
    scene_end = false
    obligatory = mustObligatory
  }

  switch (oracleQuestion) {
    case 'oracle_guessnumber':
      if (oracleAnswer.includes('success')) {
        gamestate.players[token].card.eyes_open = true
        privateMessage = ['action_oracle_open_you_eyes']
      } else {
        setPlayerRoleAndTeam('oracle', null, 'action_oracle_team')
      }
      break
    case 'oracle_viewplayer':
      gamestate.players[token].card_or_mark_action = true
      showCards = getCardIdsByPositions(gamestate.positions.card_positions, [`player_${oracleAnswer}`])
      privateMessage = ['action_selected_card', formatPlayerIdentifier([`player_${oracleAnswer}`])[0]]
      break
    case 'oracle_alienteam':
      if (oracleAftermath.includes('alienteam_yes')) {
        setPlayerRoleAndTeam('alien', null, 'action_alien_team')
        if (oracleAftermath.includes('alienteam_yes2')) {
          setPlayerRoleAndTeam('alien', 'ALIEN', 'action_alien_role')
        }
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_werewolfteam':
      if (oracleAftermath.includes('werewolfteam')) {
        setPlayerRoleAndTeam('werewolf', null, 'action_werewolf_team')
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_vampireteam':
      if (oracleAftermath.includes('vampireteam')) {
        setPlayerRoleAndTeam('vampire', null, 'action_vampire_team')
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_centerexchange':
      if (oracleAftermath.includes('yes1')) {
        configureRoleAction(1, 'action_must_one_center', true)
      } else {
        privateMessage = ['action_stay_oracle']
      }
      break
    case 'oracle_viewcenter':
      if (oracleAftermath.includes('yes1')) {
        configureRoleAction(1, 'action_may_one_center')
      } else if (oracleAftermath.includes('yes2')) {
        configureRoleAction(2, 'action_may_two_center')
      } else if (oracleAftermath.includes('yes3')) {
        configureRoleAction(3, 'action_must_three_center', true)
      }
      break
  }

  return generateRoleAction(gamestate, token, title, {
    private_message: privateMessage,
    showCards,
    selectableCards: { selectable_cards, selectable_card_limit },
    uniqueInformation: { viewed_cards: showCards },
    scene_end,
    obligatory
  })
}
