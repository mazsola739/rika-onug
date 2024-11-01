export const resetPlayerReadiness = (players) => {
    return Object.fromEntries(
      Object.entries(players).map(([id, player]) => [id, { ...player, ready: false }])
    )
  }