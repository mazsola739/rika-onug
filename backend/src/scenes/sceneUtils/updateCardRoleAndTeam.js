export const updateCardRoleAndTeam = (gamestate, position, role, team) => {
  gamestate.positions.card_positions[position].card.role = role
  gamestate.positions.card_positions[position].card.team = team
}
