export const addVote = (playerNumber, selectedPosition, votes) => {
  const updatedVotes = { ...votes }

  if (votes[selectedPosition]) {
    updatedVotes[selectedPosition].push(playerNumber)
  } else {
    updatedVotes[selectedPosition] = [playerNumber]
  }

  return updatedVotes
}
