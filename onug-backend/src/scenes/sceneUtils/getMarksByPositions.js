export const getMarksByPositions = (cardPositions, selectedPositions) => {
    const result = []
  
    selectedPositions.forEach(position => {
      const mark = cardPositions[position].mark
      result.push({ [position]: mark })
    })
  
    return result
  }