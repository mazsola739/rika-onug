import { makeAutoObservable } from 'mobx'
import { WsJsonMessage } from 'types'

class RoleStore {
  constructor() {
    makeAutoObservable(this)
  }

  openYourEyes(lastJsonMessage: WsJsonMessage): void {

  }
}

export default RoleStore
export const roleStore = new RoleStore()
