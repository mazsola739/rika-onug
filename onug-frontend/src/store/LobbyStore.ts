import { lobbyRequest } from 'api'
import { makeAutoObservable, runInAction } from 'mobx'
import { PresetType, RoomType } from 'types'

class LobbyStore {
  rooms: RoomType[] = []
  presets: PresetType[] = []
  errorMessage: string | null = null
  isLoading = false

  constructor() {
    makeAutoObservable(this)
  }

  async fetchLobby() {
    runInAction(() => {
      this.isLoading = true
    })

    try {
      const { rooms = [], presets = [] } = await lobbyRequest() // No `.data` here

      runInAction(() => {
        this.rooms = rooms.map((room: RoomType) => ({
          room_id: room.room_id,
          room_name: room.room_name
        }))

        this.presets = presets.map((preset: PresetType) => ({
          description: preset.description,
          cards: preset.cards
        }))
      })
    } catch (error) {
      runInAction(() => {
        this.errorMessage = error.message || 'Failed to fetch lobby data'
      })
    } finally {
      runInAction(() => {
        this.isLoading = false
      })
    }
  }
}
export const lobbyStore = new LobbyStore()
