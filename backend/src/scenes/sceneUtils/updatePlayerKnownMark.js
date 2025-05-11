export const updatePlayerKnownMark = (gamestate, token, mark) => {
  gamestate.players[token].card.player_mark = mark
}
