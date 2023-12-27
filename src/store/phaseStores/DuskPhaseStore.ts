import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from '../actionStores'
import { selectedDeckStore } from 'store'
import { actionStoreUtils } from 'utils'

const { isCardSelectedById, addRoleActions, areAnyCardsSelectedById } =
  actionStoreUtils

class DuskPhaseStore {
  actionTime: number
  votingTime: number

  constructor(actionTime = 10, votingTime = 240) {
    this.actionTime = actionTime
    this.votingTime = votingTime
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const duskPhaseActions: RoleActionType[] = []

    addRoleActions(
      ActionStores.vampireStore,
      areAnyCardsSelectedById(this.deck, [41, 40, 39]),
      duskPhaseActions
    )
    addRoleActions(
      ActionStores.thecountStore,
      isCardSelectedById(this.deck, 39),
      duskPhaseActions
    )
    addRoleActions(
      ActionStores.renfieldStore,
      isCardSelectedById(this.deck, 38),
      duskPhaseActions
    )
    addRoleActions(
      ActionStores.diseasedStore,
      isCardSelectedById(this.deck, 32),
      duskPhaseActions
    )
    addRoleActions(
      ActionStores.cupidStore,
      isCardSelectedById(this.deck, 31),
      duskPhaseActions
    )
    addRoleActions(
      ActionStores.instigatorStore,
      isCardSelectedById(this.deck, 34),
      duskPhaseActions
    )
    addRoleActions(
      ActionStores.priestStore,
      isCardSelectedById(this.deck, 37),
      duskPhaseActions
    )
    addRoleActions(
      ActionStores.assassinStore,
      areAnyCardsSelectedById(this.deck, [29, 28]),
      duskPhaseActions
    )

    return duskPhaseActions
  }
}

export default DuskPhaseStore
export const duskPhaseStore = new DuskPhaseStore()
