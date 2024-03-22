import { roomsRequest } from 'api'
import { makeAutoObservable, runInAction } from 'mobx'
import { RoomType } from 'types'

class LobbyStore {
  rooms: RoomType[] = []
  errorMessage: string | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  async fetchRooms() {
    runInAction(() => {
      this.isLoading = true
    })

    try {
      const rooms = await roomsRequest()
      runInAction(() => {
        this.rooms = rooms
      })
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error.message
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}

export default LobbyStore
export const lobbyStore = new LobbyStore()
