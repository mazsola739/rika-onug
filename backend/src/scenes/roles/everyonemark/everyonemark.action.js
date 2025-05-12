import { generateRoleAction, getMarksByPositions, getPlayerNumbersByGivenConditions } from '../../sceneUtils'

export const everyonemarkAction = (gamestate, token, title) => {
  const currentPlayerNumber = getPlayerNumbersByGivenConditions(gamestate, 'currentPlayer', token)[0]
  const showMarks = getMarksByPositions(gamestate.positions.card_positions, [currentPlayerNumber])

  //    updatePlayerRoleAndTeam(gamestate, token, 'TANNER', 'tanner')

  switch (gamestate.positions.card_positions[currentPlayerNumber].mark) {
    case 'mark_of_clarity':
      gamestate.players[token].card.player_mark = 'mark_of_clarity'
      break
    case 'mark_of_the_bat':
      gamestate.players[token].card.player_mark = 'mark_of_the_bat'
      break
    case 'mark_of_fear':
      gamestate.players[token].card.player_mark = 'mark_of_fear'
      break
    case 'mark_of_vampire':
      gamestate.players[token].card.player_team = 'vampire'
      gamestate.players[token].card.player_mark = 'mark_of_vampire'
      break
    case 'mark_of_disease':
      gamestate.players[token].card.player_role = 'DISEASED'
      gamestate.players[token].card.player_mark = 'mark_of_disease'
      break
    case 'mark_of_love':
      gamestate.players[token].card.player_role = 'LOVER'
      gamestate.players[token].card.player_mark = 'mark_of_love'
      break
    case 'mark_of_traitor':
      gamestate.players[token].card.player_role = 'TRAITOR'
      gamestate.players[token].card.player_mark = 'mark_of_traitor'
      break
    case 'mark_of_assassin':
      gamestate.players[token].card.player_role = 'VICTIM'
      gamestate.players[token].card.player_mark = 'mark_of_assassin'
      break
  }

  return generateRoleAction(gamestate, token, title, {
    private_message: ['action_own_mark'],
    showMarks,
    scene_end: true
  })
}
