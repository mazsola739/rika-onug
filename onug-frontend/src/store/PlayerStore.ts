import { makeAutoObservable } from 'mobx'
import { gameTableStore } from 'store'
import { CenterCardType, PlayerType } from 'types'

export class PlayerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get players(): PlayerType[] {
    return gameTableStore.players
  }

  get centerCards(): CenterCardType {
    return gameTableStore.centerCards
  }
}

export default PlayerStore
export const playerStore = new PlayerStore()
