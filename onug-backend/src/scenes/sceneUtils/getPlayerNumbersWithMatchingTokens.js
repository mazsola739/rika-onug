export const getPlayerNumbersWithMatchingTokens = (players, tokens) =>
  tokens.map((token) => players[token].player_number)
