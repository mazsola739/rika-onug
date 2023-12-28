import { makeAutoObservable } from 'mobx'
import {
  duskPhaseStore,
  nightPhaseStore,
  selectedDeckStore,
  twilightPhaseStore,
} from 'store'
import { BASE_TIME, everyone } from 'constant'
import { RoleActionType } from 'types'

import { actionStoreUtils, gamePlayStoreUtils } from 'utils'

const { getRandomJoke, generateTimedAction } = actionStoreUtils
export const { addBasicAction } = gamePlayStoreUtils

class GamePlayStore {
  actionTime: number
  votingTime: number
  isGameStarted = false
  isGameStopped = true
  isGamePaused = false

  constructor(actionTime = 10, votingTime = 240) {
    this.actionTime = actionTime
    this.votingTime = votingTime
    makeAutoObservable(this)
  }

  get hasDusk(): boolean {
    return selectedDeckStore.hasDusk()
  }

  get isEpicBattle(): boolean {
    return selectedDeckStore.isEpicBattle()
  }

  generateActions(): RoleActionType[] {
    const gamePlayActions: RoleActionType[] = []
    this.addEpicBattleIntro(gamePlayActions)
    this.addStartingActions(gamePlayActions)
    this.addPhaseActions(gamePlayActions)
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
      addBasicAction(actions, everyone.epic_intro_text, BASE_TIME)
    }
  }

  addStartingActions(actions: RoleActionType[]): void {
    addBasicAction(actions, everyone.everyone_start_card_text, BASE_TIME)
    actions.push(generateTimedAction(this.actionTime))
    addBasicAction(actions, everyone.everyone_close_text, BASE_TIME)
  }

  addPhaseActions(actions: RoleActionType[]): void {
    actions.push(
      ...twilightPhaseStore.generateActions(),
      ...duskPhaseStore.generateActions()
    )

    if (this.hasDusk) {
      addBasicAction(actions, everyone.everyone_wake_dusk_text, BASE_TIME)
      actions.push(generateTimedAction(this.actionTime))
      addBasicAction(actions, everyone.everyone_close_text, BASE_TIME)
    }

    actions.push(...nightPhaseStore.generateActions())
  }

  addJokeAndVoting(actions: RoleActionType[]): void {
    addBasicAction(actions, getRandomJoke(), BASE_TIME)
    const moveText = this.hasDusk
      ? everyone.everyone_move_mark_text
      : everyone.everyone_move_card_text
    addBasicAction(actions, moveText, BASE_TIME)
    addBasicAction(
      actions,
      everyone.everyone_wake_text,
      BASE_TIME + this.votingTime
    )
    addBasicAction(actions, everyone.everyone_vote_text, BASE_TIME)
  }
}

export default GamePlayStore
export const gamePlayStore = new GamePlayStore()
