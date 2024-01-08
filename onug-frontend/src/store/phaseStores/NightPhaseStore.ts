import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from '../actionStores'
import { selectedDeckStore } from 'store'
import { actionStoreUtils, utils } from 'utils'
import { alienIds, supervillainIds, wolfIds } from 'constant'
import { makeAutoObservable } from 'mobx'

const { addRoleActionsBasedOnCondition } = actionStoreUtils
const { areAllCardsSelectedById, areAnyCardSelectedById, isCardSelectedById } =
  utils

class NightPhaseStore {
  constructor() {
    makeAutoObservable(this)
  }

  get deck(): ActionCardType[] {
    return selectedDeckStore.gamePlayDeck
  }

  generateActions(): RoleActionType[] {
    const nightPhaseActions: RoleActionType[] = []

    addRoleActionsBasedOnCondition(
      ActionStores.loverStore,
      isCardSelectedById(this.deck, 31),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.sentinelStore,
      isCardSelectedById(this.deck, 25),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.alienStore,
      areAnyCardSelectedById(this.deck, alienIds),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.groobzerbStore,
      areAllCardsSelectedById(this.deck, [47, 54]),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.bodysnatcherStore,
      isCardSelectedById(this.deck, 74),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.supervillainStore,
      (areAnyCardSelectedById(this.deck, [57, 65, 69]) &&
        (isCardSelectedById(this.deck, 60) ||
          areAnyCardSelectedById(this.deck, [58]))) ||
        (areAnyCardSelectedById(this.deck, supervillainIds) &&
          isCardSelectedById(this.deck, 58)),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.werewolfStore,
      areAnyCardSelectedById(this.deck, wolfIds),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.alphawolfStore,
      isCardSelectedById(this.deck, 17),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.mysticwolfStore,
      isCardSelectedById(this.deck, 22),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.minionStore,
      isCardSelectedById(this.deck, 32) &&
        areAnyCardSelectedById(this.deck, wolfIds),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.apprenticetannerStore,
      areAllCardsSelectedById(this.deck, [71, 10]),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.leaderStore,
      isCardSelectedById(this.deck, 48) &&
        areAnyCardSelectedById(this.deck, alienIds),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.madscientistStore,
      isCardSelectedById(this.deck, 63),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.internStore,
      isCardSelectedById(this.deck, 62),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.masonStore,
      areAllCardsSelectedById(this.deck, [5, 6]),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.thingStore,
      isCardSelectedById(this.deck, 85),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.annoyingladStore,
      isCardSelectedById(this.deck, 55),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.seerStore,
      isCardSelectedById(this.deck, 9),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.apprenticeseerStore,
      isCardSelectedById(this.deck, 18),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.paranormalinvestigatorStore,
      isCardSelectedById(this.deck, 23),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.marksmanStore,
      isCardSelectedById(this.deck, 35),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.nostradamusStore,
      isCardSelectedById(this.deck, 80),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.psychicStore,
      isCardSelectedById(this.deck, 51),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.detectorStore,
      isCardSelectedById(this.deck, 56),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.robberStore,
      isCardSelectedById(this.deck, 8),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.witchStore,
      isCardSelectedById(this.deck, 27),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.pickpocketStore,
      isCardSelectedById(this.deck, 36),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.roleretrieverStore,
      isCardSelectedById(this.deck, 66),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.voodoolouStore,
      isCardSelectedById(this.deck, 70),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.troublemakerStore,
      isCardSelectedById(this.deck, 11),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.villageidiotStore,
      isCardSelectedById(this.deck, 26),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.auraseerStore,
      isCardSelectedById(this.deck, 72),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.gremlinStore,
      isCardSelectedById(this.deck, 33),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.rascalStore,
      isCardSelectedById(this.deck, 52),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.switcherooStore,
      isCardSelectedById(this.deck, 68),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.drunkStore,
      isCardSelectedById(this.deck, 2),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.insomniacStore,
      isCardSelectedById(this.deck, 4),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.selfawarenessgirlStore,
      isCardSelectedById(this.deck, 67),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.squireStore,
      isCardSelectedById(this.deck, 83) &&
        areAnyCardSelectedById(this.deck, wolfIds),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.familymanStore,
      isCardSelectedById(this.deck, 78),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.beholderStore,
      isCardSelectedById(this.deck, 73) &&
        areAnyCardSelectedById(this.deck, [9, 18]),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.revealerStore,
      isCardSelectedById(this.deck, 24),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.exposerStore,
      isCardSelectedById(this.deck, 46),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.flipperStore,
      isCardSelectedById(this.deck, 59),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.empathStore,
      isCardSelectedById(this.deck, 77),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.curatorStore,
      isCardSelectedById(this.deck, 20),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.blobStore,
      isCardSelectedById(this.deck, 44),
      nightPhaseActions
    )
    addRoleActionsBasedOnCondition(
      ActionStores.morticiansStore,
      isCardSelectedById(this.deck, 49),
      nightPhaseActions
    )

    return nightPhaseActions
  }
}

export default NightPhaseStore
export const nightPhaseStore = new NightPhaseStore()
