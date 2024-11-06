export const addVote = (playerNumber, selectedPosition, votes) => {
  const updatedVotes = { ...votes }

  if (votes[selectedPosition]) {
    updatedVotes[selectedPosition].push(`player_${playerNumber}`)
  } else {
    updatedVotes[selectedPosition] = [`player_${playerNumber}`]
  }

  return updatedVotes
}
