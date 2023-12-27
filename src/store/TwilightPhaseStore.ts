import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from './ActionStore'
import { actionStoreUtils } from 'utils'
import { selectedDeckStore } from 'store'

const { addRoleActions, isCardSelectedById } = actionStoreUtils

class TwilightPhaseStore {
  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const twilightActionsPhase: RoleActionType[] = []

    addRoleActions(
      ActionStores.oracleStore,
      isCardSelectedById(this.deck, 50),
      twilightActionsPhase
    )
    addRoleActions(
      ActionStores.copycatStore,
      isCardSelectedById(this.deck, 30),
      twilightActionsPhase
    )
    addRoleActions(
      ActionStores.mirrormanStore,
      isCardSelectedById(this.deck, 64),
      twilightActionsPhase
    )
    addRoleActions(
      ActionStores.doppelgangerStore,
      isCardSelectedById(this.deck, 1),
      twilightActionsPhase
    )

    return twilightActionsPhase
  }
}

export default TwilightPhaseStore
export const twilightPhaseStore = new TwilightPhaseStore()
