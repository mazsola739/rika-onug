import { makeAutoObservable } from 'mobx'

//TODO do i need?
class GameStatusStore {
  isGamePlayStarted = false
  isGamePlayStopped = true
  isGamePlayPaused = false

  constructor() {
    makeAutoObservable(this)
  }

  resetStatus(): void {
    this.isGamePlayStarted = false
    this.isGamePlayStopped = false
    this.isGamePlayPaused = false
  }

  toggleStart(): void {
    if (!this.isGamePlayStarted) {
      this.resetStatus()
      this.isGamePlayStarted = true
    } else {
      this.isGamePlayStopped = true
    }
  }

  toggleStop(): void {
    if (!this.isGamePlayStopped) {
      this.resetStatus()
      this.isGamePlayStopped = true
    } else {
      this.isGamePlayStarted = true
    }
  }

  togglePause(): void {
    if (!this.isGamePlayPaused) {
      this.resetStatus()
      this.isGamePlayPaused = true
    } else {
      this.isGamePlayStopped = true
    }
  }
}

export default GameStatusStore
export const gameStatusStore = new GameStatusStore()
