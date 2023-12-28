import { ActionCardType, RoleActionType } from 'types'
import * as ActionStores from '../actionStores'
import { selectedDeckStore } from 'store'
import { actionStoreUtils } from 'utils'
import { alienIds, supervillainIds, wolfIds } from 'constant'

const {
  addRoleActions,
  areAllCardsSelectedById,
  areAnyCardsSelectedById,
  isCardSelectedById,
} = actionStoreUtils

class NightPhaseStore {
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
    const nightPhaseActions: RoleActionType[] = []

    addRoleActions(
      ActionStores.loverStore,
      isCardSelectedById(this.deck, 31),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.sentinelStore,
      isCardSelectedById(this.deck, 25),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.alienStore,
      areAnyCardsSelectedById(this.deck, alienIds),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.groobzerbStore,
      areAllCardsSelectedById(this.deck, [47, 54]),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.bodysnatcherStore,
      isCardSelectedById(this.deck, 74),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.supervillainStore,
      (areAnyCardsSelectedById(this.deck, [57, 65, 69]) &&
        (isCardSelectedById(this.deck, 60) ||
          areAnyCardsSelectedById(this.deck, [58]))) ||
        (areAnyCardsSelectedById(this.deck, supervillainIds) &&
          isCardSelectedById(this.deck, 58)),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.werewolfStore,
      areAnyCardsSelectedById(this.deck, wolfIds),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.alphawolfStore,
      isCardSelectedById(this.deck, 17),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.mysticwolfStore,
      isCardSelectedById(this.deck, 22),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.minionStore,
      isCardSelectedById(this.deck, 32) &&
        areAnyCardsSelectedById(this.deck, wolfIds),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.apprenticetannerStore,
      areAllCardsSelectedById(this.deck, [71, 10]),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.leaderStore,
      isCardSelectedById(this.deck, 48) &&
        areAnyCardsSelectedById(this.deck, alienIds),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.madscientistStore,
      isCardSelectedById(this.deck, 63),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.internStore,
      isCardSelectedById(this.deck, 62),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.masonStore,
      areAllCardsSelectedById(this.deck, [5, 6]),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.thingStore,
      isCardSelectedById(this.deck, 85),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.annoyingladStore,
      isCardSelectedById(this.deck, 55),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.seerStore,
      isCardSelectedById(this.deck, 9),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.apprenticeseerStore,
      isCardSelectedById(this.deck, 18),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.paranormalinvestigatorStore,
      isCardSelectedById(this.deck, 23),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.marksmanStore,
      isCardSelectedById(this.deck, 35),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.nostradamusStore,
      isCardSelectedById(this.deck, 80),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.psychicStore,
      isCardSelectedById(this.deck, 51),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.detectorStore,
      isCardSelectedById(this.deck, 56),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.robberStore,
      isCardSelectedById(this.deck, 8),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.witchStore,
      isCardSelectedById(this.deck, 27),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.pickpocketStore,
      isCardSelectedById(this.deck, 36),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.roleretrieverStore,
      isCardSelectedById(this.deck, 66),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.voodoolouStore,
      isCardSelectedById(this.deck, 70),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.troublemakerStore,
      isCardSelectedById(this.deck, 11),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.villageidiotStore,
      isCardSelectedById(this.deck, 26),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.auraseerStore,
      isCardSelectedById(this.deck, 72),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.gremlinStore,
      isCardSelectedById(this.deck, 33),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.rascalStore,
      isCardSelectedById(this.deck, 52),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.switcherooStore,
      isCardSelectedById(this.deck, 68),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.drunkStore,
      isCardSelectedById(this.deck, 2),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.insomniacStore,
      isCardSelectedById(this.deck, 4),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.selfawarenessgirlStore,
      isCardSelectedById(this.deck, 67),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.squireStore,
      isCardSelectedById(this.deck, 83) &&
        areAnyCardsSelectedById(this.deck, wolfIds),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.familymanStore,
      isCardSelectedById(this.deck, 78),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.beholderStore,
      isCardSelectedById(this.deck, 73) &&
        areAnyCardsSelectedById(this.deck, [9, 18]),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.revealerStore,
      isCardSelectedById(this.deck, 24),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.exposerStore,
      isCardSelectedById(this.deck, 46),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.flipperStore,
      isCardSelectedById(this.deck, 59),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.empathStore,
      isCardSelectedById(this.deck, 77),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.curatorStore,
      isCardSelectedById(this.deck, 20),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.blobStore,
      isCardSelectedById(this.deck, 44),
      nightPhaseActions
    )
    addRoleActions(
      ActionStores.morticiansStore,
      isCardSelectedById(this.deck, 49),
      nightPhaseActions
    )

    return nightPhaseActions
  }
}

export default NightPhaseStore
export const nightPhaseStore = new NightPhaseStore()
