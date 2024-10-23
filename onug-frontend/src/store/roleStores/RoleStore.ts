import { makeAutoObservable } from 'mobx'
import { boardStore, interactionStore } from 'store'
import { WsJsonMessage } from 'types'

class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {
    const answerOptions: string[] = lastJsonMessage.interaction.answer_options || []

    interactionStore.selectableCenterCardLimit = lastJsonMessage.interaction.selectable_card_limit?.center
    interactionStore.selectablePlayerCardLimit = lastJsonMessage.interaction.selectable_card_limit?.player
    interactionStore.selectableMarkLimit = lastJsonMessage.interaction.selectable_mark_limit?.mark
  }
}

export default RoleStore
export const roleStore = new RoleStore()
