import { makeAutoObservable } from 'mobx'
import { selectedDeckStore } from 'store'
import { ACTION_TIME, BASE_TIME, VOTING_TIME, everyone } from 'constant'
import { RoleActionType } from 'types'
import { utils, gamePlayStoreUtils } from 'utils'

const { addBasicAction, getRandomJoke } = gamePlayStoreUtils
const { generateTimedAction } = utils

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

  generateActions(): RoleActionType[] {
    const gamePlayActions: RoleActionType[] = []

    this.addEpicBattleIntro(gamePlayActions)
    this.addStartingActions(gamePlayActions)
    this.addJokeAndVoting(gamePlayActions)

    return gamePlayActions
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

  addEpicBattleIntro(actions: RoleActionType[]): void {
    if (this.isEpicBattle) {
      addBasicAction(actions, everyone.epic_intro_text, BASE_TIME, '')
    }
  }

  addStartingActions(actions: RoleActionType[]): void {
    addBasicAction(actions, everyone.everyone_start_card_text, BASE_TIME, '')
    actions.push(generateTimedAction(ACTION_TIME))
    addBasicAction(actions, everyone.everyone_close_text, BASE_TIME, '')
  }

  addJokeAndVoting(actions: RoleActionType[]): void {
    addBasicAction(actions, getRandomJoke(), BASE_TIME, '')
    const moveText = this.hasDusk
      ? everyone.everyone_move_mark_text
      : everyone.everyone_move_card_text
    addBasicAction(actions, moveText, BASE_TIME, 'movecard')
    addBasicAction(
      actions,
      everyone.everyone_wake_text,
      BASE_TIME + VOTING_TIME,
      ''
    )
    addBasicAction(actions, everyone.everyone_vote_text, BASE_TIME, '')
  }
}

export default GamePlayStore
export const gamePlayStore = new GamePlayStore()
