import { makeAutoObservable } from 'mobx'
import { CardType, PlayerType, PlayersType } from 'types'
import { createDefaultCard, createDefaultPlayer } from 'utils'

class PlayersStore {
  player: PlayerType = createDefaultPlayer()
  players: PlayersType[]
  playerCard: CardType = createDefaultCard()

  constructor() {
    makeAutoObservable(this)
  }

  setPlayer(player: PlayerType): void {
    this.player = player
  }

  setPlayers(players: PlayersType[]): void {
    this.players = players
  }
}

export default PlayersStore
export const playersStore = new PlayersStore()
