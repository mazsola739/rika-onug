export const findMostVoted = (votes) => {
  let maxVotes = 0
  let mostVotedPlayers = []

  for (const playerNumber in votes) {
    const voteCount = votes[playerNumber].length

    if (voteCount > maxVotes) {
      maxVotes = voteCount
      mostVotedPlayers = [playerNumber]
    } else if (voteCount === maxVotes) {
      mostVotedPlayers.push(playerNumber)
    }
  }

  return mostVotedPlayers
}
