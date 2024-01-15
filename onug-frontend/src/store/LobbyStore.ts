import { roomsRequest } from 'api'
import { action, makeAutoObservable } from 'mobx'
import { RoomType } from 'types'

class LobbyStore {
  rooms: RoomType[] = []
  errorMessage: string | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  @action
  async fetchRooms() {
    this.isLoading = true
    try {
      this.rooms = await roomsRequest()
    } catch (error) {
      this.errorMessage = error.message
    } finally {
      this.isLoading = false
    }
  }
}

export default LobbyStore
export const lobbyStore = new LobbyStore()
