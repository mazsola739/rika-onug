import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from '../actionStores'
import { ripplePhaseStore } from 'store'
import { actionStoreUtils } from 'utils'
import { alienIds, supervillainIds, wolfIds } from 'constant'
import { makeAutoObservable } from 'mobx'

const {
  addRoleActions,
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  isCardSelectedById,
} = actionStoreUtils

class RippleNightPhaseStore {
  constructor() {
    makeAutoObservable(this)
  }

  get rippleDeck(): ActionCardType[] {
    return ripplePhaseStore.rippleDeck()
  }

  generateActions(): RoleActionType[] {
    const rippleNightPhaseActions: RoleActionType[] = []

    console.log(this.rippleDeck.map((card) => card.card_name))

    addRoleActions(
      ActionStores.alienStore,
      areAnyCardsSelectedById(this.rippleDeck, alienIds),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.groobzerbStore,
      areAllCardsSelectedById(this.rippleDeck, [47, 54]),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.bodysnatcherStore,
      isCardSelectedById(this.rippleDeck, 74),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.supervillainStore,
      (areAnyCardsSelectedById(this.rippleDeck, [57, 65, 69]) &&
        (isCardSelectedById(this.rippleDeck, 60) ||
          areAnyCardsSelectedById(this.rippleDeck, [58]))) ||
        (areAnyCardsSelectedById(this.rippleDeck, supervillainIds) &&
          isCardSelectedById(this.rippleDeck, 58)),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.werewolfStore,
      areAnyCardsSelectedById(this.rippleDeck, wolfIds),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.alphawolfStore,
      isCardSelectedById(this.rippleDeck, 17),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.mysticwolfStore,
      isCardSelectedById(this.rippleDeck, 22),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.minionStore,
      isCardSelectedById(this.rippleDeck, 32) &&
        areAnyCardsSelectedById(this.rippleDeck, wolfIds),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.apprenticetannerStore,
      areAllCardsSelectedById(this.rippleDeck, [71, 10]),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.leaderStore,
      isCardSelectedById(this.rippleDeck, 48) &&
        areAnyCardsSelectedById(this.rippleDeck, alienIds),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.madscientistStore,
      isCardSelectedById(this.rippleDeck, 63),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.internStore,
      isCardSelectedById(this.rippleDeck, 62),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.masonStore,
      areAllCardsSelectedById(this.rippleDeck, [5, 6]),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.thingStore,
      isCardSelectedById(this.rippleDeck, 85),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.annoyingladStore,
      isCardSelectedById(this.rippleDeck, 55),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.seerStore,
      isCardSelectedById(this.rippleDeck, 9),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.apprenticeseerStore,
      isCardSelectedById(this.rippleDeck, 18),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.paranormalinvestigatorStore,
      isCardSelectedById(this.rippleDeck, 23),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.marksmanStore,
      isCardSelectedById(this.rippleDeck, 35),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.nostradamusStore,
      isCardSelectedById(this.rippleDeck, 80),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.psychicStore,
      isCardSelectedById(this.rippleDeck, 51),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.detectorStore,
      isCardSelectedById(this.rippleDeck, 56),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.robberStore,
      isCardSelectedById(this.rippleDeck, 8),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.witchStore,
      isCardSelectedById(this.rippleDeck, 27),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.pickpocketStore,
      isCardSelectedById(this.rippleDeck, 36),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.roleretrieverStore,
      isCardSelectedById(this.rippleDeck, 66),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.voodoolouStore,
      isCardSelectedById(this.rippleDeck, 70),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.troublemakerStore,
      isCardSelectedById(this.rippleDeck, 11),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.villageidiotStore,
      isCardSelectedById(this.rippleDeck, 26),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.auraseerStore,
      isCardSelectedById(this.rippleDeck, 72),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.gremlinStore,
      isCardSelectedById(this.rippleDeck, 33),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.rascalStore,
      isCardSelectedById(this.rippleDeck, 52),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.switcherooStore,
      isCardSelectedById(this.rippleDeck, 68),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.drunkStore,
      isCardSelectedById(this.rippleDeck, 2),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.insomniacStore,
      isCardSelectedById(this.rippleDeck, 4),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.selfawarenessgirlStore,
      isCardSelectedById(this.rippleDeck, 67),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.squireStore,
      isCardSelectedById(this.rippleDeck, 83) &&
        areAnyCardsSelectedById(this.rippleDeck, wolfIds),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.familymanStore,
      isCardSelectedById(this.rippleDeck, 78),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.beholderStore,
      isCardSelectedById(this.rippleDeck, 73) &&
        areAnyCardsSelectedById(this.rippleDeck, [9, 18]),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.revealerStore,
      isCardSelectedById(this.rippleDeck, 24),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.exposerStore,
      isCardSelectedById(this.rippleDeck, 46),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.flipperStore,
      isCardSelectedById(this.rippleDeck, 59),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.empathStore,
      isCardSelectedById(this.rippleDeck, 77),
      rippleNightPhaseActions
    )
    addRoleActions(
      ActionStores.morticiansStore,
      isCardSelectedById(this.rippleDeck, 49),
      rippleNightPhaseActions
    )

    return rippleNightPhaseActions
  }
}

export default RippleNightPhaseStore
export const rippleNightPhaseStore = new RippleNightPhaseStore()
