import { makeAutoObservable } from 'mobx'
import {
  duskPhaseStore,
  nightPhaseStore,
  ripplePhaseStore,
  selectedDeckStore,
  twilightPhaseStore,
} from 'store'
import { ACTION_TIME, BASE_TIME, VOTING_TIME, everyone } from 'constant'
import { RoleActionType } from 'types'

import { actionStoreUtils, gamePlayStoreUtils } from 'utils'
import { rippleNightPhaseStore } from './phaseStores/RippleNightPhaseStore'

const { generateTimedAction, getRandomJoke } = actionStoreUtils
const { addBasicAction } = gamePlayStoreUtils

//TODO EASTEREGG

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

  get isRepeat(): boolean {
    return ripplePhaseStore.isRepeat()
  }

  generateActions(): RoleActionType[] {
    const gamePlayActions: RoleActionType[] = []

    this.addEpicBattleIntro(gamePlayActions)
    this.addStartingActions(gamePlayActions)
    this.addPhaseActions(gamePlayActions)
    if (this.shouldStartRipple) {
      this.addRipplePhaseActions(gamePlayActions)
    }
    if (this.isRepeat) {
      this.addRippleNightPhaseActions(gamePlayActions)
    }
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
    addBasicAction(
      actions,
      everyone.everyone_start_card_text,
      BASE_TIME,
      'card_background'
    )
    actions.push(generateTimedAction(ACTION_TIME))
    addBasicAction(
      actions,
      everyone.everyone_close_text,
      BASE_TIME,
      'card_background'
    )
  }

  addPhaseActions(actions: RoleActionType[]): void {
    actions.push(
      ...twilightPhaseStore.generateActions(),
      ...duskPhaseStore.generateActions()
    )

    if (this.hasDusk) {
      addBasicAction(
        actions,
        everyone.everyone_wake_dusk_text,
        BASE_TIME,
        'mark_background'
      )
      actions.push(generateTimedAction(ACTION_TIME))
      addBasicAction(
        actions,
        everyone.everyone_close_text,
        BASE_TIME,
        'mark_background'
      )
    }

    actions.push(...nightPhaseStore.generateActions())
  }

  addRipplePhaseActions(actions: RoleActionType[]): void {
    actions.push(...ripplePhaseStore.generateActions())
  }

  addRippleNightPhaseActions(actions: RoleActionType[]): void {
    actions.push(...rippleNightPhaseStore.generateActions())
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
