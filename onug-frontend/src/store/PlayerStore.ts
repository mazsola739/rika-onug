import { makeAutoObservable } from 'mobx'
import { PlayerType } from 'types'

class PlayerStore {
  player: PlayerType

  constructor() {
    makeAutoObservable(this)

    this.setPlayer = this.setPlayer.bind(this)
  }

  setPlayer(player: PlayerType): void {
    this.player = player
  }
}

export default PlayerStore
export const playerStore = new PlayerStore()
