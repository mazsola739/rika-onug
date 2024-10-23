import { makeAutoObservable } from 'mobx'
import { PlayerType, PlayersType } from 'types'
import { interactionStore } from './InteractionStore'

class BoardStore {
  player: PlayerType
  players: PlayersType[]

  constructor() {
    makeAutoObservable(this)

    this.setPlayer = this.setPlayer.bind(this)
    this.setPlayers = this.setPlayers.bind(this)
  }

  setPlayer(player: PlayerType): void {
    this.player = player
  }

  setPlayers(players: PlayersType[]): void {
    this.players = players
  }

  closeYourEyes(): void {
    interactionStore.resetInteraction()
  }
}

export default BoardStore
export const boardStore = new BoardStore()
