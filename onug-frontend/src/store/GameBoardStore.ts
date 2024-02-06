import { makeAutoObservable } from 'mobx'
import {
  BoardCardType,
  PlayerType,
  PlayersType,
  PositionKeys,
  PositionProperties,
  PositionType,
} from 'types'

class GameBoardStore {
  player: PlayerType
  players: PlayersType[]
  boardCards: BoardCardType[]

  centerCards: PositionProperties[]
  playerCards: PositionProperties[]

  center_left: PositionType
  center_middle: PositionType
  center_right: PositionType
  center_wolf: PositionType
  center_villain: PositionType
  player_1: PositionType
  player_2: PositionType
  player_3: PositionType
  player_4: PositionType
  player_5: PositionType
  player_6: PositionType
  player_7: PositionType
  player_8: PositionType
  player_9: PositionType
  player_10: PositionType
  player_11: PositionType
  player_12: PositionType

  constructor() {
    makeAutoObservable(this)

    this.setPlayer = this.setPlayer.bind(this)
    this.setPlayers = this.setPlayers.bind(this)
    this.setBoardCards = this.setBoardCards.bind(this)
    this.setPlayerCards = this.setPlayerCards.bind(this)
    this.setCenterCards = this.setCenterCards.bind(this)

    this.centerCards = []
    this.playerCards = []

    this.center_left = { position: 'center_left' }
    this.center_middle = { position: 'center_middle' }
    this.center_right = { position: 'center_right' }
    this.center_wolf = { position: 'center_wolf' }
    this.center_villain = { position: 'center_villain' }
    this.player_1 = { position: 'player_1', ready: false }
    this.player_2 = { position: 'player_2', ready: false }
    this.player_3 = { position: 'player_3', ready: false }
    this.player_4 = { position: 'player_4', ready: false }
    this.player_5 = { position: 'player_5', ready: false }
    this.player_6 = { position: 'player_6', ready: false }
    this.player_7 = { position: 'player_7', ready: false }
    this.player_8 = { position: 'player_8', ready: false }
    this.player_9 = { position: 'player_9', ready: false }
    this.player_10 = { position: 'player_10', ready: false }
    this.player_11 = { position: 'player_11', ready: false }
    this.player_12 = { position: 'player_12', ready: false }
  }

  setPlayer(player: PlayerType): void {
    this.player = player
  }

  setPlayerCards(playerCards: PositionProperties[]): void {
    this.playerCards = playerCards
  }

  setCenterCards(centerCards: PositionProperties[]): void {
    this.centerCards = centerCards
  }

  setPlayers(players: PlayersType[]): void {
    this.players = players
  }

  /*   setBoardCards(boardCards: BoardCardType[]): void {
    this.boardCards = boardCards
  }
 */
  setBoardCards(boardCards: BoardCardType[]): void {
    this.boardCards = boardCards

    const playerCards: PositionProperties[] = []
    const centerCards: PositionProperties[] = []

    boardCards.forEach((boardCard) => {
      const { position, card } = boardCard
      const positionKey = position as PositionKeys
      if (this[positionKey]) {
        const positionObject = this[positionKey] as PositionProperties
        positionObject.id =
          `player_${this.player.player_number}` === positionObject.position
            ? this.player.player_card_id
            : card.id
        positionObject.artifact = card.artifact
        positionObject.shield = card.shield

        if (position.startsWith('center')) {
          centerCards.push(positionObject)
        } else {
          playerCards.push(positionObject)
        }
      }
    })

    this.players.forEach((player) => {
      const positionKey = `player_${player.player_number}` as PositionKeys
      const position = playerCards.find((card) => card.position === positionKey)
      if (position) {
        position.ready = player.ready
      }
    })

    this.centerCards = centerCards
    this.playerCards = playerCards
  }
}

export default GameBoardStore
export const gameBoardStore = new GameBoardStore()
