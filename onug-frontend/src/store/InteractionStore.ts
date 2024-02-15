import { makeObservable, observable, action } from 'mobx'
import { doppelgangerStore, roleStore } from './roleStores'
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
       roleStore.openYourEyes(this.lastJsonMessage)
       break; */
      case 'ALPHA_WOLF':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "ANNOYING_LAD":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "APPRENTICE_ASSASSIN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_APPRENTICE_ASSASSIN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "APPRENTICE_SEER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break; */
      case 'APPRENTICE_TANNER':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "ASSASSIN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_ASSASSIN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "AURA_SEER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "BEHOLDER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "BLOB":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "BODY_SNATCHER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_BODY_SNATCHER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "COPYCAT":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "COW":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "CUPID":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "CURATOR":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_CURATOR":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DETECTOR":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DISEASED":
         roleStore.openYourEyes(this.lastJsonMessage)
         break; */
      case 'DOPPELGÄNGER':
        doppelgangerStore.openYourEyes(this.lastJsonMessage)
        break
      case 'DOPPELGÄNGER_INSTANT_ACTION':
        doppelgangerStore.instantNightAction(this.lastJsonMessage)
        break /*
      case "DR_PEEKER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;*/
      case 'DRUNK':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "EMPATH":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_EMPATH":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "EVERYONE_MARK":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "EVILOMETER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "EXPOSER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_EXPOSER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "FAMILY_MAN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "FLIPPER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_FLIPPER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "GREMLIN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_GREMLIN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "GROOB_ZERB":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;*/
      case 'INSOMNIAC':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "INSTIGATOR":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "INTERN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "LEADER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "LEADER_ZERB_GROOB":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "LOVERS":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "MAD_SCIENTIST":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "MARKSMAN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;*/
      case 'MASONS':
        roleStore.openYourEyes(this.lastJsonMessage)
        break
      case 'MINION':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "MIRROR_MAN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "MORTICIAN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_MORTICIAN":
         roleStore.openYourEyes(this.lastJsonMessage)
         break; */
      case 'MYSTIC_WOLF':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "NOSTRADAMUS":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "NOSTRADAMUS_REACTION":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case 'ORACLE_QUESTION': 
      oracleStore.openYourEyes(this.lastJsonMessage)
      break;
      case 'ORACLE_REACTION': 
      oracleStore.openYourEyes(this.lastJsonMessage)
      break;
      case "PARANORMAL_INVESTIGATOR":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "PICKPOCKET":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_PICKPOCKET":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "PRIEST":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_PRIEST":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "PSYCHIC":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_PSYCHIC":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "RAPSCALLION":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "RASCAL":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_RASCAL":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "RENFIELD":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;*/
      case 'REVEALER':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "DOPPELGÄNGER_REVEALER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "RIPPLE":
         roleStore.openYourEyes(this.lastJsonMessage)
         break; */
      case 'ROBBER':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "ROLE_RETRIEVER":
         roleStore.openYourEyes(this.lastJsonMessage)
         break; */
      case 'SEER':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "SELF_AWARENESS_GIRL":
         roleStore.openYourEyes(this.lastJsonMessage)
         break; */
      case 'SENTINEL':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "SQUIRE":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "SUPER_VILLAINS":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "SWITCHEROO":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "TEMPTRESS":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "THE_COUNT":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "DOPPELGÄNGER_THE_COUNT":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;*/
      case 'THING':
        roleStore.openYourEyes(this.lastJsonMessage)
        break
      case 'TROUBLEMAKER':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "VAMPIRES":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "VILLAGE_IDIOT":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;
      case "VOODOO_LOU":
         roleStore.openYourEyes(this.lastJsonMessage)
         break; */
      case 'WEREWOLVES':
        roleStore.openYourEyes(this.lastJsonMessage)
        break /*
      case "WITCH":
         roleStore.openYourEyes(this.lastJsonMessage)
         break;*/
      default:
        break
    }
  }
}

export default InteractionStore
export const interactionStore = new InteractionStore()
