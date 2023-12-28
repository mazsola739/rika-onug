import { BASE_TIME, everyone } from 'constant'
import { RoleActionType } from 'types'
import { duskPhaseStore } from './phaseStores/DuskPhaseStore'
import { twilightPhaseStore } from './phaseStores/TwilightPhaseStore'
import { nightPhaseStore } from './phaseStores/NightPhaseStore'
import { actionStoreUtils } from 'utils'
import { selectedDeckStore } from 'store'

const { getRandomJoke, generateTimedAction } = actionStoreUtils

class GamePlayStore {
  actionTime: number
  votingTime: number

  constructor(actionTime = 10, votingTime = 240) {
    this.actionTime = actionTime
    this.votingTime = votingTime
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

  addEpicBattleIntro(actions: RoleActionType[]): void {
    if (this.isEpicBattle) {
      actions.push({ text: everyone.epic_intro_text, time: BASE_TIME })
    }
  }

  addStartingActions(actions: RoleActionType[]): void {
    actions.push(
      { text: everyone.everyone_start_card_text, time: BASE_TIME },
      generateTimedAction(this.actionTime),
      { text: everyone.everyone_close_text, time: BASE_TIME }
    )
  }

  addPhaseActions(actions: RoleActionType[]): void {
    actions.push(
      ...twilightPhaseStore.generateActions(),
      ...duskPhaseStore.generateActions()
    )

    if (this.hasDusk) {
      actions.push(
        { text: everyone.everyone_wake_dusk_text, time: BASE_TIME },
        generateTimedAction(this.actionTime),
        { text: everyone.everyone_close_text, time: BASE_TIME }
      )
    }

    actions.push(...nightPhaseStore.generateActions())
  }

  addJokeAndVoting(actions: RoleActionType[]): void {
    actions.push(
      { text: getRandomJoke(), time: BASE_TIME },
      {
        text: this.hasDusk
          ? everyone.everyone_move_mark_text
          : everyone.everyone_move_card_text,
        time: BASE_TIME,
      },
      { text: everyone.everyone_wake_text, time: BASE_TIME + this.votingTime },
      { text: everyone.everyone_vote_text, time: BASE_TIME }
    )
  }
}

export default GamePlayStore
export const gamePlayStore = new GamePlayStore()
