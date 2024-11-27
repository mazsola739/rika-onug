export const getRandomSceneNumber = selectedCards => {
  const result = []
  const filteredArray = selectedCards.filter(card => card !== 50)

  if (filteredArray.length === 0) return result

  const randomIndex = Math.floor(Math.random() * filteredArray.length)
  result.push(filteredArray[randomIndex])

  return result
}
