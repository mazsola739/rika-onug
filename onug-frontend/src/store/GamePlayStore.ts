import { makeAutoObservable } from 'mobx'

class GamePlayStore {
  isGameStarted = false
  isGameStopped = true
  isGamePaused = false
  startingTime = 0

  constructor() {
    makeAutoObservable(this)
  }

  setStartingTime(startingTime: number): void {
    this.startingTime = startingTime
  }

  toggleGameStatus(): void {
    this.isGameStarted = !this.isGameStarted
    this.isGameStopped = !this.isGameStopped
  }

  resetGame(): void {
    this.isGameStarted = false
    this.isGameStopped = true
  }

  togglePauseStatus(): void {
    this.isGamePaused = !this.isGamePaused
  }
}

export default GamePlayStore
export const gamePlayStore = new GamePlayStore()
