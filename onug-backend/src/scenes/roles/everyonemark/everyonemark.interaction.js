import { generateRoleInteraction, getMarksByPositions, getPlayerNumberWithMatchingToken } from '../../sceneUtils'

export const everyonemarkInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const viewMarks = getMarksByPositions(newGamestate.card_positions, [currentPlayerNumber])

  switch (newGamestate.card_positions[currentPlayerNumber].mark) {
    case 'mark_of_clarity':
      newGamestate.players[token].card.player_mark = 'mark_of_clarity'
      break
    case 'mark_of_the_bat':
      newGamestate.players[token].card.player_mark = 'mark_of_the_bat'
      break
    case 'mark_of_fear':
      newGamestate.players[token].card.player_mark = 'mark_of_fear'
      break
    case 'mark_of_vampire':
      newGamestate.players[token].card.player_team = 'vampire'
      newGamestate.players[token].card.player_mark = 'mark_of_vampire'
      break
    case 'mark_of_disease':
      newGamestate.players[token].card.player_role = 'DISEASED'
      newGamestate.players[token].card.player_mark = 'mark_of_disease'
      break
    case 'mark_of_love':
      newGamestate.players[token].card.player_role = 'LOVER'
      newGamestate.players[token].card.player_mark = 'mark_of_love'
      break
    case 'mark_of_traitor':
      newGamestate.players[token].card.player_role = 'TRAITOR'
      newGamestate.players[token].card.player_mark = 'mark_of_traitor'
      break
    case 'mark_of_assassin':
      newGamestate.players[token].card.player_role = 'VICTIM'
      newGamestate.players[token].card.player_mark = 'mark_of_assassin'
      break
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_marks: viewMarks,
    obligatory: true,
    scene_end: true
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_own_mark'],
    showMarks: viewMarks,
    obligatory: true,
    scene_end: true
  })
}
