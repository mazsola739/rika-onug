import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from '../actionStores'
import { ripplePhaseStore } from 'store'
import { actionStoreUtils, utils } from 'utils'
import { alienIds, supervillainIds, wolfIds } from 'constant'
import { makeAutoObservable } from 'mobx'

const { addRoleActionsBasedOnCondition } = actionStoreUtils
const { areAllCardsSelectedById, areAnyCardSelectedById, isCardSelectedById } =
  utils

class RippleNightPhaseStore {
  constructor() {
    makeAutoObservable(this)
  }

  get rippleDeck(): ActionCardType[] {
    return ripplePhaseStore.rippleDeck()
  }

  generateActions(): RoleActionType[] {
    const rippleNightPhaseActions: RoleActionType[] = []

    addRoleActionsBasedOnCondition(
      ActionStores.alienStore,
      areAnyCardSelectedById(this.rippleDeck, alienIds),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.groobzerbStore,
      areAllCardsSelectedById(this.rippleDeck, [47, 54]),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.bodysnatcherStore,
      isCardSelectedById(this.rippleDeck, 74),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.supervillainStore,
      (areAnyCardSelectedById(this.rippleDeck, [57, 65, 69]) &&
        (isCardSelectedById(this.rippleDeck, 60) ||
          areAnyCardSelectedById(this.rippleDeck, [58]))) ||
        (areAnyCardSelectedById(this.rippleDeck, supervillainIds) &&
          isCardSelectedById(this.rippleDeck, 58)),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.werewolfStore,
      areAnyCardSelectedById(this.rippleDeck, wolfIds),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.alphawolfStore,
      isCardSelectedById(this.rippleDeck, 17),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.mysticwolfStore,
      isCardSelectedById(this.rippleDeck, 22),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.minionStore,
      isCardSelectedById(this.rippleDeck, 7) &&
        areAnyCardSelectedById(this.rippleDeck, wolfIds),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.apprenticetannerStore,
      areAllCardsSelectedById(this.rippleDeck, [71, 10]),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.leaderStore,
      isCardSelectedById(this.rippleDeck, 48) &&
        areAnyCardSelectedById(this.rippleDeck, alienIds),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.madscientistStore,
      isCardSelectedById(this.rippleDeck, 63),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.internStore,
      isCardSelectedById(this.rippleDeck, 62),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.masonStore,
      areAllCardsSelectedById(this.rippleDeck, [5, 6]),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.thingStore,
      isCardSelectedById(this.rippleDeck, 85),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.annoyingladStore,
      isCardSelectedById(this.rippleDeck, 55),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.seerStore,
      isCardSelectedById(this.rippleDeck, 9),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.apprenticeseerStore,
      isCardSelectedById(this.rippleDeck, 18),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.paranormalinvestigatorStore,
      isCardSelectedById(this.rippleDeck, 23),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.marksmanStore,
      isCardSelectedById(this.rippleDeck, 35),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.nostradamusStore,
      isCardSelectedById(this.rippleDeck, 80),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.psychicStore,
      isCardSelectedById(this.rippleDeck, 51),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.detectorStore,
      isCardSelectedById(this.rippleDeck, 56),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.robberStore,
      isCardSelectedById(this.rippleDeck, 8),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.witchStore,
      isCardSelectedById(this.rippleDeck, 27),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.pickpocketStore,
      isCardSelectedById(this.rippleDeck, 36),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.roleretrieverStore,
      isCardSelectedById(this.rippleDeck, 66),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.voodoolouStore,
      isCardSelectedById(this.rippleDeck, 70),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.troublemakerStore,
      isCardSelectedById(this.rippleDeck, 11),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.villageidiotStore,
      isCardSelectedById(this.rippleDeck, 26),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.auraseerStore,
      isCardSelectedById(this.rippleDeck, 72),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.gremlinStore,
      isCardSelectedById(this.rippleDeck, 33),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.rascalStore,
      isCardSelectedById(this.rippleDeck, 52),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.switcherooStore,
      isCardSelectedById(this.rippleDeck, 68),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.drunkStore,
      isCardSelectedById(this.rippleDeck, 2),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.insomniacStore,
      isCardSelectedById(this.rippleDeck, 4),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.selfawarenessgirlStore,
      isCardSelectedById(this.rippleDeck, 67),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.squireStore,
      isCardSelectedById(this.rippleDeck, 83) &&
        areAnyCardSelectedById(this.rippleDeck, wolfIds),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.familymanStore,
      isCardSelectedById(this.rippleDeck, 78),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.beholderStore,
      isCardSelectedById(this.rippleDeck, 73) &&
        areAnyCardSelectedById(this.rippleDeck, [9, 18]),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.revealerStore,
      isCardSelectedById(this.rippleDeck, 24),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.exposerStore,
      isCardSelectedById(this.rippleDeck, 46),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.flipperStore,
      isCardSelectedById(this.rippleDeck, 59),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.empathStore,
      isCardSelectedById(this.rippleDeck, 77),
      rippleNightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.morticiansStore,
      isCardSelectedById(this.rippleDeck, 49),
      rippleNightPhaseActions
    )

    return rippleNightPhaseActions
  }
}

export default RippleNightPhaseStore
export const rippleNightPhaseStore = new RippleNightPhaseStore()
