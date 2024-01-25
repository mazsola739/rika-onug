
/* class TwilightPhaseStore {
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
 */