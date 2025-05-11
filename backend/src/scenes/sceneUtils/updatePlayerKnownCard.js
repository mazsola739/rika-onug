export const updatePlayerKnownCard = (gamestate, token, player_card_id, player_role, player_role_id, player_team) => {
  Object.assign(gamestate.players[token].card, {
    player_card_id,
    player_role,
    player_role_id,
    player_team
  })
}
