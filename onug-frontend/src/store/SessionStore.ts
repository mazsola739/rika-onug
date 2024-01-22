import { makeObservable, observable, action } from 'mobx'

class SessionStore {
  room_id = ''
  token = ''
  player_name = ''

  constructor() {
    makeObservable(this, {
      room_id: observable,
      token: observable,
      player_name: observable,
      setRoomId: action,
      setToken: action,
      setPlayerName: action,
    })

    this.loadFromSessionStorage()
  }

  loadFromSessionStorage() {
    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')
    const player_name = sessionStorage.getItem('player_name')

    if (room_id) {
      this.setRoomId(room_id)
    }

    if (token) {
      this.setToken(token)
    }

    if (player_name) {
      this.setPlayerName(player_name)
    }
  }

  setRoomId(room_id: string) {
    this.room_id = room_id
    sessionStorage.setItem('room_id', room_id)
  }

  setToken(token: string) {
    this.token = token
    sessionStorage.setItem('token', token)
  }

  setPlayerName(player_name: string) {
    this.player_name = player_name
    sessionStorage.setItem('token', player_name)
  }
}

export default SessionStore
export const sessionStore = new SessionStore()
