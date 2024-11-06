export const getCardIdsByPositions = (cardPositions, selectedPositions) => {
  const result = []

  selectedPositions.forEach((position) => {
    const cardId = cardPositions[position].card.id
    result.push({ [position]: cardId })
  })

  return result
}
