import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from '../actionStores'
import { actionStoreUtils, utils } from 'utils'
import { selectedDeckStore } from 'store'
import { makeAutoObservable } from 'mobx'

const { addRoleActionsBasedOnCondition } = actionStoreUtils
const { isCardSelectedById } = utils

class TwilightPhaseStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const twilightActionsPhase: RoleActionType[] = []

    addRoleActionsBasedOnCondition(
      ActionStores.oracleStore,
      isCardSelectedById(this.deck, 50),
      twilightActionsPhase
    )
    addRoleActionsBasedOnCondition(
      ActionStores.copycatStore,
      isCardSelectedById(this.deck, 30),
      twilightActionsPhase
    )
    addRoleActionsBasedOnCondition(
      ActionStores.mirrormanStore,
      isCardSelectedById(this.deck, 64),
      twilightActionsPhase
    )
    addRoleActionsBasedOnCondition(
      ActionStores.doppelgangerStore,
      isCardSelectedById(this.deck, 1),
      twilightActionsPhase
    )

    return twilightActionsPhase
  }
}

export default TwilightPhaseStore
export const twilightPhaseStore = new TwilightPhaseStore()
