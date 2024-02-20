import { roomsRequest } from 'api'
import { makeAutoObservable } from 'mobx'
import { RoomType } from 'types'

class LobbyStore {
  rooms: RoomType[] = []
  errorMessage: string | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

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
