export const countVotes = players => {
  const voteCounts = Object.fromEntries(Object.keys(players).map(id => [players[id].player_number, []]))

  Object.values(players).forEach(player => {
    player.vote.forEach(target => {
      if (voteCounts[target]) voteCounts[target].push(player.player_number)
    })
  })

  return voteCounts
}

export const getTopVotes = countedVotes => {
  const voteEntries = Object.entries(countedVotes).map(([player, votes]) => ({
    player,
    votes: votes.length
  }))

  voteEntries.sort((a, b) => b.votes - a.votes)

  const mostVoted = []
  const secondMostVoted = []

  if (voteEntries.length > 0) {
    const highestVotes = voteEntries[0].votes
    const secondHighestVotes = voteEntries.find(entry => entry.votes < highestVotes)?.votes

    mostVoted.push(...voteEntries.filter(entry => entry.votes === highestVotes).map(entry => entry.player))

    if (secondHighestVotes !== undefined) {
      secondMostVoted.push(...voteEntries.filter(entry => entry.votes === secondHighestVotes).map(entry => entry.player))
    }
  }

  return { mostVoted, secondMostVoted }
}

export const getActiveAndInactiveCards = cardPositions => {
  const activeCards = []
  const inactiveCards = []

  Object.entries(cardPositions).forEach(([position, details]) => {
    const card = details.card

    if (card.id === 0) return

    if (position.startsWith('player_')) {
      activeCards.push({ position, ...card })
    } else if (position.startsWith('center_')) {
      inactiveCards.push({ position, ...card })
    }
  })

  return { activeCards, inactiveCards }
}

const getPlayerNames = players => {
  return Object.fromEntries(Object.values(players).map(player => [player.player_number, player.name]))
}

export const buildVoteResult = (countedVotes, players) => {
  const playerNames = getPlayerNames(players)

  const voteResult = Object.entries(countedVotes).map(([playerNumber, voterNumbers]) => {
    return {
      player_number: playerNumber,
      name: playerNames[playerNumber],
      voters: voterNumbers.map(voter => playerNames[voter]),
      win: false,
      survived: true
    }
  })

  return voteResult
}
