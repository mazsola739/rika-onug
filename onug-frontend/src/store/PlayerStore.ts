import { makeAutoObservable } from 'mobx'
import { roomStore } from 'store'
import { CenterCardType, PlayerType } from 'types'
/*import { actionStoreUtils, roomStoreUtils } from 'utils'

 const { checkCardPresence, filterCardsByIds, getRandomItemFromArray } =
  roomStoreUtils
const { areAnyCardsSelectedById } = actionStoreUtils */

export class PlayerStore {
  constructor() {
    makeAutoObservable(this)
  }

  get players(): PlayerType[] {
    return roomStore.players
  }

  get centerCards(): CenterCardType {
    return roomStore.centerCards
  }
}

export default PlayerStore
export const playerStore = new PlayerStore()
