import { generateRoleInteraction, getMarksByPositions, getPlayerNumberWithMatchingToken } from '../../sceneUtils'

export const everyonemarkInteraction = (gamestate, token, title) => {
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(gamestate.players, token)
  const viewMarks = getMarksByPositions(gamestate.card_positions, [currentPlayerNumber])

  switch (gamestate.card_positions[currentPlayerNumber].mark) {
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

  gamestate.players[token].player_history[title] = {
    ...gamestate.players[token].player_history[title],
    viewed_marks: viewMarks,
    obligatory: true,
    scene_end: true
  }

  return generateRoleInteraction(gamestate, token, {
    private_message: ['interaction_own_mark'],
    showMarks: viewMarks,
    obligatory: true,
    scene_end: true
  })
}
