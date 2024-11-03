import { computed, makeAutoObservable } from 'mobx'
import { Player } from 'types'
import { createDefaultPlayer } from 'utils'

class PlayersStore {
  player: Player = createDefaultPlayer()
  players: Player[] = []

  constructor() {
    makeAutoObservable(this, {
      isPlayerReady: computed
    })
  }

  setPlayer(player: Player): void {
    this.player = player
  }

  setPlayers(players: Player[]): void {
    this.players = players
  }

  get isPlayerReady(): boolean {
    const currentPlayer = this.players.find(
      actualPlayer => actualPlayer.player_number === this.player.player_number
    )
    
    return currentPlayer ? currentPlayer.flag : false
  }
}

export default PlayersStore
export const playersStore = new PlayersStore()
