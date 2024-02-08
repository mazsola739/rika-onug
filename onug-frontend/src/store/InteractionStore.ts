import { makeObservable, observable, action } from 'mobx'
import { insomniacStore, masonsStore, werewolvesStore } from './roleStores'
import { WsJsonMessage } from 'types'

class InteractionStore {
  lastJsonMessage: WsJsonMessage = {}
  hasMessageBox = false
  selectedCards: string[] = []

  constructor() {
    makeObservable(this, {
      lastJsonMessage: observable,
      hasMessageBox: observable,
      selectedCards: observable,
      toggleMessageBoxStatus: action,
      setLastJsonMessage: action,
      setInteraction: action,
    })
  }

  toggleMessageBoxStatus(boolean: boolean): void {
    this.hasMessageBox = boolean
  }

  setSelectedCards(positions: string[]): void {
    this.selectedCards = positions
  }

  setLastJsonMessage(lastJsonMessage: WsJsonMessage): void {
    this.lastJsonMessage = lastJsonMessage
  }

  setInteraction(title: string): void {
    /* if (this.lastJsonMessage && title) {} */
    switch (title) {
      /*case "ALIENS": aliensStore
      
      break;
      case "ALPHA_WOLF": alphawolfStore
      
      break;
      case "ANNOYING_LAD": annoyingladStore
      
      break;
      case "APPRENTICE_ASSASSIN": apprenticeassassinStore
      
      break;
      case "DOPPELGÄNGER_APPRENTICE_ASSASSIN": apprenticeassassinStore
      
      break;
      case "APPRENTICE_SEER": apprenticeseerStore
      
      break;
      case "APPRENTICE_TANNER": apprenticetannerStore
      
      break;
      case "ASSASSIN": assassinStore
      
      break;
      case "DOPPELGÄNGER_ASSASSIN": assassinStore
      
      break;
      case "AURA_SEER": auraseerStore
      
      break;
      case "BEHOLDER": beholderStore
      
      break;
      case "BLOB": blobStore
      
      break;
      case "BODY_SNATCHER": bodysnatcherStore
      
      break;
      case "DOPPELGÄNGER_BODY_SNATCHER": bodysnatcherStore
      
      break;
      case "COPYCAT": copycatStore
      
      break;
      case "COW": cowStore
      
      break;
      case "CUPID": cupidStore
      
      break;
      case "CURATOR": curatorStore
      
      break;
      case "DOPPELGÄNGER_CURATOR": curatorStore
      
      break;
      case "DETECTOR": detectorStore
      
      break;
      case "DISEASED": diseasedStore
      
      break;
      case "DOPPELGÄNGER": doppelgangerStore
      
      break;
      case "DOPPELGÄNGER_INSTANT_ACTION": doppelgangerStore
      
      break;
      case "DR_PEEKER": drpeekerStore
      
      break;
      case "DRUNK": drunkStore
      
      break;
      case "EMPATH": empathStore
      
      break;
      case "DOPPELGÄNGER_EMPATH": empathStore
      
      break;
      case "EVERYONE_MARK": everyonemarkStore
      
      break;
      case "EVILOMETER": evilometerStore
      
      break;
      case "EXPOSER": exposerStore
      
      break;
      case "DOPPELGÄNGER_EXPOSER": exposerStore
      
      break;
      case "FAMILY_MAN": familymanStore
      
      break;
      case "FLIPPER": flipperStore
      
      break;
      case "DOPPELGÄNGER_FLIPPER": flipperStore
      
      break;
      case "GREMLIN": gremlinStore
      
      break;
      case "DOPPELGÄNGER_GREMLIN": gremlinStore
      
      break;
      case "GROOB_ZERB": groobzerbStore
      
      break;*/
      case 'INSOMNIAC':
        insomniacStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "INSTIGATOR": instigatorStore
      
      break;
      case "INTERN": internStore
      
      break;
      case "LEADER": leaderStore
      
      break;
      case "LEADER_ZERB_GROOB": leaderStore
      
      break;
      case "LOVERS": loverStore
      
      break;
      case "MAD_SCIENTIST": madscientistStore
      
      break;
      case "MARKSMAN": marksmanStore
      
      break;*/
      case 'MASONS':
        masonsStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "MINION": minionStore
      
      break;
      case "MIRROR_MAN": mirrormanStore
      
      break;
      case "MORTICIAN": morticianStore
      
      break;
      case "DOPPELGÄNGER_MORTICIAN": morticianStore
      
      break;
      case "MYSTIC_WOLF": mysticwolfStore
      
      break;
      case "NOSTRADAMUS": nostradamusStore
      
      break;
      case "NOSTRADAMUS_REACTION": nostradamusStore
      
      break;
      case 'ORACLE_QUESTION': oracleStore
      
      break;
      case 'ORACLE_REACTION': oracleStore
      
      break;
      case "PARANORMAL_INVESTIGATOR": paranormalinvestigatorStore
      
      break;
      case "PICKPOCKET": pickpocketStore
      
      break;
      case "DOPPELGÄNGER_PICKPOCKET": pickpocketStore
      
      break;
      case "PRIEST": priestStore
      
      break;
      case "DOPPELGÄNGER_PRIEST": priestStore
      
      break;
      case "PSYCHIC": psychicStore
      
      break;
      case "DOPPELGÄNGER_PSYCHIC": psychicStore
      
      break;
      case "RAPSCALLION": rapscallionStore
      
      break;
      case "RASCAL": rascalStore
      
      break;
      case "DOPPELGÄNGER_RASCAL": rascalStore
      
      break;
      case "RENFIELD": renfieldStore
      
      break;
      case "REVEALER": revealerStore
      
      break;
      case "DOPPELGÄNGER_REVEALER": revealerStore
      
      break;
      case "RIPPLE": rippleStore
      
      break;
      case "ROBBER": robberStore
      
      break;
      case "ROLE_RETRIEVER": roleretrieverStore
      
      break;
      case "SEER": seerStore
      
      break;
      case "SELF_AWARENESS_GIRL": selfawarenessgirlStore
      
      break;
      case "SENTINEL": sentinelStore
      
      break;
      case "SQUIRE": squireStore
      
      break;
      case "SUPER_VILLAINS": supervillainsStore
      
      break;
      case "SWITCHEROO": switcherooStore
      
      break;
      case "TEMPTRESS": temptressStore
      
      break;
      case "THE_COUNT": thecountStore
      
      break;
      case "DOPPELGÄNGER_THE_COUNT": thecountStore
      
      break;
      case "THING": thingStore
      
      break;
      case "TROUBLEMAKER": troublemakerStore
      
      break;
      case "VAMPIRES": vampireStore
      
      break;
      case "VILLAGE_IDIOT": villageidiotStore
      
      break;
      case "VOODOO_LOU": voodoolouStore
      
      break; */
      case 'WEREWOLVES':
        werewolvesStore.openYourEyes(this.lastJsonMessage)

        break /*
      case "WITCH": witchStore
      
      break;*/
      default:
        break
    }
  }
}

export default InteractionStore
export const interactionStore = new InteractionStore()
