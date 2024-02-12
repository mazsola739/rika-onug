import { makeObservable, observable, action } from 'mobx'
import {
  doppelgangerStore,
  drunkStore,
  insomniacStore,
  masonsStore,
  minionStore,
  robberStore,
  seerStore,
  sentinelStore,
  thingStore,
  troublemakerStore,
  werewolvesStore,
} from './roleStores'
import { WsJsonMessage } from 'types'

class InteractionStore {
  lastJsonMessage: WsJsonMessage = {}
  hasMessageBox = false
  selectedPlayerCards: string[] = []
  selectedCenterCards: string[] = []
  selectedCards: string[] = []
  selectablePlayerCardLimit = 0
  selectableCenterCardLimit = 0

  constructor() {
    makeObservable(this, {
      lastJsonMessage: observable,
      hasMessageBox: observable,
      selectedCenterCards: observable,
      selectedPlayerCards: observable,
      selectedCards: observable,
      selectablePlayerCardLimit: observable,
      selectableCenterCardLimit: observable,

      resetInteraction: action,
      toggleMessageBoxStatus: action,
      setSelectedCenterCards: action,
      setSelectedPlayerCards: action,
      setSelectedCards: action,
      setLastJsonMessage: action,
      setInteraction: action,
    })
  }

  resetInteraction(): void {
    this.selectedCenterCards = []
    this.selectedPlayerCards = []
    this.selectedCards = []
    this.toggleMessageBoxStatus(false)
    this.selectablePlayerCardLimit = 0
    this.selectableCenterCardLimit = 0
  }

  toggleMessageBoxStatus(boolean: boolean): void {
    this.hasMessageBox = boolean
  }

  setSelectedCenterCards(positions: string[]): void {
    this.selectedCenterCards = positions
  }

  setSelectedPlayerCards(positions: string[]): void {
    this.selectedPlayerCards = positions
  }

  setSelectedCards(positions: string[]): void {
    this.selectedCards = positions
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessage): void {
    this.lastJsonMessage = lastJsonMessage
  }

  setInteraction(title: string): void {
    this.resetInteraction()
    /* if (this.lastJsonMessage && title) {} */
    switch (title) {
      /*case "ALIENS":
       aliensStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "ALPHA_WOLF":
         alphawolfStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "ANNOYING_LAD":
         annoyingladStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "APPRENTICE_ASSASSIN":
         apprenticeassassinStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_APPRENTICE_ASSASSIN":
         apprenticeassassinStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "APPRENTICE_SEER":
         apprenticeseerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "APPRENTICE_TANNER":
         apprenticetannerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "ASSASSIN":
         assassinStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_ASSASSIN":
         assassinStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "AURA_SEER":
         auraseerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "BEHOLDER":
         beholderStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "BLOB":
         blobStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "BODY_SNATCHER":
         bodysnatcherStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_BODY_SNATCHER":
         bodysnatcherStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "COPYCAT":
         copycatStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "COW":
         cowStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "CUPID":
         cupidStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "CURATOR":
         curatorStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_CURATOR":
         curatorStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DETECTOR":
         detectorStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DISEASED":
         diseasedStore.openYourEyes(this.lastJsonMessage)
      
      break; */
      case 'DOPPELGÄNGER':
        doppelgangerStore.openYourEyes(this.lastJsonMessage)

        break
      case 'DOPPELGÄNGER_INSTANT_ACTION':
        doppelgangerStore.instantNightAction(this.lastJsonMessage)

        break /*
      case "DR_PEEKER":
         drpeekerStore.openYourEyes(this.lastJsonMessage)
      
      break;*/
      case 'DRUNK':
        drunkStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "EMPATH":
         empathStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_EMPATH":
         empathStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "EVERYONE_MARK":
         everyonemarkStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "EVILOMETER":
         evilometerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "EXPOSER":
         exposerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_EXPOSER":
         exposerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "FAMILY_MAN":
         familymanStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "FLIPPER":
         flipperStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_FLIPPER":
         flipperStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "GREMLIN":
         gremlinStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_GREMLIN":
         gremlinStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "GROOB_ZERB":
         groobzerbStore.openYourEyes(this.lastJsonMessage)
      
      break;*/
      case 'INSOMNIAC':
        insomniacStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "INSTIGATOR":
         instigatorStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "INTERN":
         internStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "LEADER":
         leaderStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "LEADER_ZERB_GROOB":
         leaderStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "LOVERS":
         loverStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "MAD_SCIENTIST":
         madscientistStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "MARKSMAN":
         marksmanStore.openYourEyes(this.lastJsonMessage)
      
      break;*/
      case 'MASONS':
        masonsStore.openYourEyes(this.lastJsonMessage)

        break
      case 'MINION':
        minionStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "MIRROR_MAN":
         mirrormanStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "MORTICIAN":
         morticianStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_MORTICIAN":
         morticianStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "MYSTIC_WOLF":
         mysticwolfStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "NOSTRADAMUS":
         nostradamusStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "NOSTRADAMUS_REACTION":
         nostradamusStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case 'ORACLE_QUESTION': oracleStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case 'ORACLE_REACTION': oracleStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "PARANORMAL_INVESTIGATOR":
         paranormalinvestigatorStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "PICKPOCKET":
         pickpocketStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_PICKPOCKET":
         pickpocketStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "PRIEST":
         priestStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_PRIEST":
         priestStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "PSYCHIC":
         psychicStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_PSYCHIC":
         psychicStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "RAPSCALLION":
         rapscallionStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "RASCAL":
         rascalStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_RASCAL":
         rascalStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "RENFIELD":
         renfieldStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "REVEALER":
         revealerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_REVEALER":
         revealerStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "RIPPLE":
         rippleStore.openYourEyes(this.lastJsonMessage)
      
      break; */
      case 'ROBBER':
        robberStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "ROLE_RETRIEVER":
         roleretrieverStore.openYourEyes(this.lastJsonMessage)
      
      break; */
      case 'SEER':
        seerStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "SELF_AWARENESS_GIRL":
         selfawarenessgirlStore.openYourEyes(this.lastJsonMessage)
      
      break; */
      case 'SENTINEL':
        sentinelStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "SQUIRE":
         squireStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "SUPER_VILLAINS":
         supervillainsStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "SWITCHEROO":
         switcherooStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "TEMPTRESS":
         temptressStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "THE_COUNT":
         thecountStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "DOPPELGÄNGER_THE_COUNT":
         thecountStore.openYourEyes(this.lastJsonMessage)
      
      break;*/
      case 'THING':
        thingStore.openYourEyes(this.lastJsonMessage)

        break
      case 'TROUBLEMAKER':
        troublemakerStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "VAMPIRES":
         vampireStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "VILLAGE_IDIOT":
         villageidiotStore.openYourEyes(this.lastJsonMessage)
      
      break;
      case "VOODOO_LOU":
         voodoolouStore.openYourEyes(this.lastJsonMessage)
      
      break; */
      case 'WEREWOLVES':
        werewolvesStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "WITCH":
         witchStore.openYourEyes(this.lastJsonMessage)
      
      break;*/
      default:
        break
    }
  }
}

export default InteractionStore
export const interactionStore = new InteractionStore()
