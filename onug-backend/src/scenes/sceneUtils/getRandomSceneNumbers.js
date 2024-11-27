export const getRandomSceneNumbers = selectedCards => {
  const result = []
  selectedCards.forEach(card => {
    if (card !== 50 && Math.random() < 0.5) {
      result.push(card)
    }
  })
  return result
}
