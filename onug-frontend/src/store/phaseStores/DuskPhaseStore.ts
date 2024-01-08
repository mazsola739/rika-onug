import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from '../actionStores'
import { selectedDeckStore } from 'store'
import { actionStoreUtils, utils } from 'utils'
import { makeAutoObservable } from 'mobx'

const { addRoleActionsBasedOnCondition } = actionStoreUtils
const { areAnyCardSelectedById, isCardSelectedById } = utils

class DuskPhaseStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const duskPhaseActions: RoleActionType[] = []

    addRoleActionsBasedOnCondition(
      ActionStores.vampireStore,
      areAnyCardSelectedById(this.deck, [41, 40, 39]),
      duskPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.thecountStore,
      isCardSelectedById(this.deck, 39),
      duskPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.renfieldStore,
      isCardSelectedById(this.deck, 38),
      duskPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.diseasedStore,
      isCardSelectedById(this.deck, 32),
      duskPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.cupidStore,
      isCardSelectedById(this.deck, 31),
      duskPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.instigatorStore,
      isCardSelectedById(this.deck, 34),
      duskPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.priestStore,
      isCardSelectedById(this.deck, 37),
      duskPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.assassinStore,
      areAnyCardSelectedById(this.deck, [29, 28]),
      duskPhaseActions
    )

    return duskPhaseActions
  }
}

export default DuskPhaseStore
export const duskPhaseStore = new DuskPhaseStore()
