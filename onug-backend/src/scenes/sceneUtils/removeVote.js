export const removeVote = (playerNumber, selectedPosition, votes) => {
  const updatedVotes = { ...votes }

  if (updatedVotes[selectedPosition]) {
    const index = updatedVotes[selectedPosition].indexOf(`player_${playerNumber}`)
    if (index !== -1) {
      updatedVotes[selectedPosition].splice(index, 1)
      if (updatedVotes[selectedPosition].length === 0) {
        delete updatedVotes[selectedPosition]
      }
    }
  }

  return updatedVotes
}
