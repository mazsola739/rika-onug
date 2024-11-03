export const resetPlayerReadiness = (players) => {
    return Object.fromEntries(
      Object.entries(players).map(([id, player]) => [id, { ...player, flag: false }])
    )
  }

export const allPlayersStateCheck = (players, state) => Object.values(players).every(player => player[state] === true)
