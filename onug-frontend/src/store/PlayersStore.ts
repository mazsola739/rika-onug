import { makeAutoObservable, computed } from 'mobx'
import { PlayerPosition, PlayerType, PlayersType, TablePlayerType } from 'types'
import { createDefaultPlayer, createDefaultTablePlayer } from 'utils'

class PlayersStore {
  player: PlayerType = createDefaultPlayer()
  players: PlayersType[] = []
  tablePlayers: TablePlayerType[] = []

  constructor() {
    makeAutoObservable(this, {
      isPlayerReady: computed
    })
  }

  setPlayer(player: PlayerType): void {
    this.player = player
  }

  setPlayers(players: PlayersType[]): void {
    this.players = players
  }

  setTablePlayers(tablePlayers: TablePlayerType[]): void {
    this.tablePlayers = tablePlayers
  }

  get tablePlayer(): TablePlayerType {
    const defaultTablePlayer = createDefaultTablePlayer()
    const playerKey = `player_${this.player.player_number}`

    const playerEntry = this.players.find(
      (actualPlayer) => actualPlayer.player_number === playerKey
    )
  
    if (playerEntry) {
      return {
        ...defaultTablePlayer,
        player_name: playerEntry.player_name,
        player_number: playerKey as PlayerPosition,
        player_card_id: this.player.player_card_id,
        player_mark: this.player.player_mark 
      }
    }

    return defaultTablePlayer
  }
  

  initializeTablePlayers(): void {
    const tablePlayers = this.players.map(player => {
      const defaultTablePlayer = createDefaultTablePlayer()
      return {
        ...defaultTablePlayer,
        player_name: player.player_name,
        player_number: `player_${player.player_number}` as PlayerPosition
      }
    })
    this.setTablePlayers(tablePlayers)
  }

  get isPlayerReady(): boolean {
    const playerNumberStr = `player_${this.player.player_number}`
    
    const currentPlayer = this.players.find(
      actualPlayer => actualPlayer.player_number === playerNumberStr
    )
    
    return currentPlayer ? currentPlayer.ready : false
  }
}

export default PlayersStore
export const playersStore = new PlayersStore()
