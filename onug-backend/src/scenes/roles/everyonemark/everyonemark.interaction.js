import { getPlayerNumberWithMatchingToken, getMarksByPositions, generateRoleInteraction } from "../../sceneUtils"

export const everyonemarkInteraction = (gamestate, token, title) => {
  const newGamestate = { ...gamestate }
  
  const currentPlayerNumber = getPlayerNumberWithMatchingToken(newGamestate.players, token)
  const viewMarks = getMarksByPositions(newGamestate.card_positions, [currentPlayerNumber])

  newGamestate.players[token].card.player_mark = newGamestate.card_positions[currentPlayerNumber].mark

  newGamestate.players[token].player_history[title] = {
    ...newGamestate.players[token].player_history[title],
    viewed_marks: [currentPlayerNumber]
  }

  return generateRoleInteraction(newGamestate, token, {
    private_message: ['interaction_own_mark'],
    icon: 'mark',
    showMarks: viewMarks,
  })
}
