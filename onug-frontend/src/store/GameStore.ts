import { makeAutoObservable } from 'mobx'

class GameStore {
  isGameStarted = false
  isGameStopped = true
  isGamePaused = false
  startingTime = 0
  endingTime = 0
  remainingTime: number[] = []
  toggleIsRunning = () => {}

  constructor() {
    makeAutoObservable(this)
  }

  setStartingTime(startingTime: number): void {
    this.startingTime = startingTime
  }

  setEndingTime(endingTime: number): void {
    this.endingTime = endingTime
  }

  addRemainingTimeToStore(remainingTime: number): void {
    this.remainingTime.push(remainingTime)
  }

  shiftRemainingTimeFromStore(): number {
    return this.remainingTime.shift()
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

  setToggleIsRunning(toggleIsRunning: (nextValue?: any) => void): void {
    this.toggleIsRunning = toggleIsRunning
  }
}

export default GameStore
export const gameStore = new GameStore()
