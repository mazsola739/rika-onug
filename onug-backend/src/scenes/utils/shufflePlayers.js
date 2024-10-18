export const shufflePlayers = totalPlayers => {
  const players = Array.from({ length: totalPlayers }, (_, i) => `identifier_player${i + 1}_text`);
  return players.sort(() => 0.5 - Math.random());
}
