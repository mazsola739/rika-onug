import {
  generateRoleInteraction,
  getMarksByPositions,
  getPlayerNumberWithMatchingToken,
} from '../../sceneUtils'

export const everyonemarkInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }

  const currentPlayerNumber = getPlayerNumberWithMatchingToken(
    newGamestate.players,
    token
  )
  const viewMarks = getMarksByPositions(newGamestate.card_positions, [
    currentPlayerNumber,
  ])

  newGamestate.players[token].card.player_mark =
    newGamestate.card_positions[currentPlayerNumber].mark

  switch (newGamestate.card_positions[currentPlayerNumber].mark) {
    case 'mark_of_vampire':
      newGamestate.players[token].card.player_team = 'vampire'
      newGamestate.card_positions[currentPlayerNumber].card.team = 'vampire'
      break
    case 'mark_of_disease':
      newGamestate.players[token].card.player_role = 'DISEASED'
      newGamestate.card_positions[currentPlayerNumber].card.role = 'DISEASED'
      break
    case 'mark_of_love':
      newGamestate.players[token].card.player_role = 'LOVER'
      newGamestate.card_positions[currentPlayerNumber].card.role = 'LOVER'
      break
    case 'mark_of_traitor':
      newGamestate.players[token].card.player_role = 'TRAITOR'
      newGamestate.card_positions[currentPlayerNumber].card.role = 'TRAITOR'
      break
    case 'mark_of_assassin':
      newGamestate.players[token].card.player_role = 'VICTIM'
      newGamestate.card_positions[currentPlayerNumber].card.role = 'VICTIM'
      break
  }

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_marks: [currentPlayerNumber],
    scene_end: true,
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_own_mark'],
    showMarks: viewMarks,
    scene_end: true,
  })
}
