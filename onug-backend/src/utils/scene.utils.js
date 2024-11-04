export const randomDelay = () => {
  return new Promise((resolve) => {
    const delay = Math.floor(Math.random() * (15000 - 5000 + 1)) + 5000
    setTimeout(resolve, delay)
  })
}

export const resetPlayerReadiness = (players) => {
    return Object.fromEntries(
      Object.entries(players).map(([id, player]) => [id, { ...player, flag: false }])
    )
  }

export const allPlayersStateCheck = (players, state) => Object.values(players).every(player => player[state] === true)
