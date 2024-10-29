import { makeAutoObservable } from 'mobx'
import { interactionStore, playersStore } from 'store'
import { WsJsonMessage } from 'types'

class DoppelgangerStore {
  constructor() {
    makeAutoObservable(this)
  }

  instantNightAction(lastJsonMessage: WsJsonMessage): void {
    const new_role_id = lastJsonMessage.interaction.new_role_id
    const { setInteraction } = interactionStore

    if (new_role_id === 2) return setInteraction('DRUNK')
    if (new_role_id === 8) return setInteraction('ROBBER')
    if (new_role_id === 9) return setInteraction('SEER')
    if (new_role_id === 11) return setInteraction('TROUBLEMAKER')
    if (new_role_id === 17) return setInteraction('ALPHA_WOLF')
    if (new_role_id === 18) return setInteraction('APPRENTICE_SEER')
    if (new_role_id === 22) return setInteraction('MYSTIC_WOLF')
    if (new_role_id === 23) return setInteraction('PARANORMAL_INVESTIGATOR')
    if (new_role_id === 25) return setInteraction('SENTINEL')
    if (new_role_id === 26) return setInteraction('VILLAGE_IDIOT')
    if (new_role_id === 27) return setInteraction('WITCH')
    if (new_role_id === 31) return setInteraction('CUPID')
    if (new_role_id === 32) return setInteraction('DISEASED')
    if (new_role_id === 34) return setInteraction('INSTIGATOR')
    if (new_role_id === 55) return setInteraction('ANNOYING_LAD')
    if (new_role_id === 56) return setInteraction('DETECTOR')
    if (new_role_id === 57) return setInteraction('DR_PEEKER')
    if (new_role_id === 65) return setInteraction('RAPSCALLION')
    if (new_role_id === 66) return setInteraction('ROLE_RETRIEVER')
    if (new_role_id === 68) return setInteraction('SWITCHEROO')
    if (new_role_id === 69) return setInteraction('TEMPTRESS')
    if (new_role_id === 70) return setInteraction('VOODOO_LOU')
    if (new_role_id === 85) return setInteraction('THING')
  }
}

/**
 * * Doppelgänger instant night actions:
 * ? 2 Drunk, 8 Robber, 9 Seer , 11 Troublemaker, 17 Alpha wolf, 18 Apprenticeseer, 22 Mystic wolf,
 * ? 23 Paranormal investigator, 25 Sentinel, 26 Village idiot, 27 Witch, 31 Cupid, 32 Diseased,
 * ? 34 Instigator, 55 Annoyinglad, 56 Detector, 57 Dr peeker, 65 Rapscallion, 66 Role retriever,
 * ? 68 Switcheroo, 69 Temptress, 70 Voodoolou, 85 Thing
 **/

export default DoppelgangerStore
export const doppelgangerStore = new DoppelgangerStore()
