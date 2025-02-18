export * from './card.utils'
export * from './connections.utils'
export * from './date.utils'
export * from './deal.utils'
export * from './player.utils'
export * from './result.utils'
export * from './scene.utils'

export const areAllPlayersReady = players => Object.values(players).every(player => player.flag)

export const resetPlayerReadiness = players => {
  Object.keys(players).forEach(playerToken => {
    players[playerToken].flag = false
  })
}
