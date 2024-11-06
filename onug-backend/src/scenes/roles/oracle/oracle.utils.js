export const createNumberArray = (number) => {
  const result = []
  for (let i = 1; i <= number; i++) {
    result.push(`${i}`)
  }
  return result
}

export const formatOracleAnswer = (answer) => `${answer}_button_label`

export const isCurrentPlayerNumberEven = (players, token) =>
  players[token].player_number % 2 === 0

export const thinkRandomNumber = () => Math.floor(Math.random() * 10) + 1
