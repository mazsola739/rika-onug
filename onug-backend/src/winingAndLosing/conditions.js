export const isCircleVote = countedVotes => {
  return Object.values(countedVotes).every(votes => votes.length === 1)
}

export const isEveryoneInSameTeam = activeCards => {
  const firstTeam = activeCards[0].team

  return activeCards.every(activeCard => activeCard.team === firstTeam)
}

export const isMostVotedPlayer = (playerNumber, mostVoted) => mostVoted.includes(playerNumber)
