export const getPartOfGroupByToken = (players, token, randomInstruction) => {
  const tokens = Object.keys(players)
  const totalPlayers = tokens.length

  const groupHeadsNumber = parseInt(players[token].player_number.split('_')[1], 10)
  const partOfGroup = [`player_${groupHeadsNumber}`]

  const side = randomInstruction.includes('left') ? 'left' : randomInstruction.includes('right') ? 'right' : 'each'
  const amount = randomInstruction.includes('4') ? 4 : randomInstruction.includes('3') ? 3 : randomInstruction.includes('2') ? 2 : 1

  const getPartOfGroupNumber = index => {
    let partOfGroupNumber = groupHeadsNumber + index
    if (partOfGroupNumber <= 0) {
      partOfGroupNumber += totalPlayers
    } else if (partOfGroupNumber > totalPlayers) {
      partOfGroupNumber -= totalPlayers
    }
    return partOfGroupNumber
  }

  if (side === 'each' || side === 'left') {
    for (let i = 1; i <= amount; i++) {
      const partOfGroupLeftSideNumber = getPartOfGroupNumber(-i)
      partOfGroup.push(`player_${partOfGroupLeftSideNumber}`)
    }
  }

  if (side === 'each' || side === 'right') {
    for (let i = 1; i <= amount; i++) {
      const partOfGroupRightSideNumber = getPartOfGroupNumber(i)
      partOfGroup.push(`player_${partOfGroupRightSideNumber}`)
    }
  }

  return partOfGroup
}
