import { action, makeAutoObservable } from 'mobx'
import { RoomType } from 'types'

class LobbyStore {
  rooms: RoomType[] = []
  errorMessage: string | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  @action async fetchRooms() {
    this.isLoading = true
    try {
      const response = await fetch('/api/rooms')

      const data = await response.json()
      if (data.message === 'Successfully fetched') {
        this.rooms = data.data
      } else {
        this.errorMessage = 'Failed to fetch rooms'
      }
    } catch (error) {
      this.errorMessage = 'An error occurred while fetching rooms'
    } finally {
      this.isLoading = false
    }
  }
}

export default LobbyStore
export const lobbyStore = new LobbyStore()
