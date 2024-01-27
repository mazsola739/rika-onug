import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'

class GamePlayStore {
  isGameStarted = false
  isGameStopped = true
  isGamePaused = false

  constructor() {
    makeAutoObservable(this)
  }

  get hasDusk(): boolean {
    return selectedDeckStore.hasDusk()
  }

  get isEpicBattle(): boolean {
    return selectedDeckStore.isEpicBattle()
  }

  get shouldStartRipple(): boolean {
    return selectedDeckStore.shouldStartRipple()
  }

  toggleGameStatus(): void {
    this.isGameStarted = !this.isGameStarted
    this.isGameStopped = !this.isGameStopped
  }

  resetGame(): void {
    selectedDeckStore.resetSelection()
    this.isGameStarted = false
    this.isGameStopped = true
  }

  togglePauseStatus(): void {
    this.isGamePaused = !this.isGamePaused
  }
}

export default GamePlayStore
export const gamePlayStore = new GamePlayStore()
