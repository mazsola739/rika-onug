import { makeAutoObservable } from 'mobx'

class GamePlayStore {
  isGamePlayStarted = false
  isGamePlayStopped = true
  isGamePlayPaused = false
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

  toggleGamePlayStatus(): void {
    this.isGamePlayStarted = !this.isGamePlayStarted
    this.isGamePlayStopped = !this.isGamePlayStopped
  } //TODO do i need?

  resetGamePlay(): void {
    this.isGamePlayStarted = false
    this.isGamePlayStopped = true
  }

  togglePauseStatus(): void {
    this.isGamePlayPaused = !this.isGamePlayPaused
  }

  setToggleIsRunning(toggleIsRunning: (nextValue?: any) => void): void {
    this.toggleIsRunning = toggleIsRunning
  }
}

export default GamePlayStore
export const gamePlayStore = new GamePlayStore()
