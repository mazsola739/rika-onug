export const getCardIdsByPlayerNumbers = (cardPositions, playerNumbers) => {
  const result = []

  playerNumbers.forEach(key => {
    const cardId = cardPositions[key].card.id
    result.push({ [key]: cardId })
  })

  return result
}
