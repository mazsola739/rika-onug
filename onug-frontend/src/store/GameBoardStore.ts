import { makeAutoObservable } from 'mobx'
import {
  GamePlayBoardCardType,
  GameTableBoardCardType,
  PlayerType,
  PlayersType,
  PositionKeys,
  PositionProperties,
  PositionType,
} from 'types'

class GameBoardStore {
  player: PlayerType
  players: PlayersType[]
  gameTableBoardCards: GameTableBoardCardType[]
  gamePlayBoardCards: GamePlayBoardCardType[]

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
    this.setGameTableBoardCards = this.setGameTableBoardCards.bind(this)
    this.setPlayerCards = this.setPlayerCards.bind(this)
    this.setCenterCards = this.setCenterCards.bind(this)
    this.getGamePlayBoardCards = this.getGamePlayBoardCards.bind(this)

    this.gameTableBoardCards = []
    this.gamePlayBoardCards = []
    this.centerCards = []
    this.playerCards = []

    this.center_left = { position: 'center_left' }
    this.center_middle = { position: 'center_middle' }
    this.center_right = { position: 'center_right' }
    this.center_wolf = { position: 'center_wolf' }
    this.center_villain = { position: 'center_villain' }
    this.player_1 = { position: 'player_1' }
    this.player_2 = { position: 'player_2' }
    this.player_3 = { position: 'player_3' }
    this.player_4 = { position: 'player_4' }
    this.player_5 = { position: 'player_5' }
    this.player_6 = { position: 'player_6' }
    this.player_7 = { position: 'player_7' }
    this.player_8 = { position: 'player_8' }
    this.player_9 = { position: 'player_9' }
    this.player_10 = { position: 'player_10' }
    this.player_11 = { position: 'player_11' }
    this.player_12 = { position: 'player_12' }
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

  setGameTableBoardCards(gameTableBoardCards: GameTableBoardCardType[]): void {
    this.gameTableBoardCards = gameTableBoardCards

    const playerCards: PositionProperties[] = []
    const centerCards: PositionProperties[] = []

    gameTableBoardCards.forEach((gameTableBoardCard) => {
      const { position, card, ready } = gameTableBoardCard
      const positionKey = position as PositionKeys
      if (this[positionKey]) {
        const positionObject = this[positionKey] as PositionProperties
        positionObject.id =
          `player_${this.player.player_number}` === positionObject.position
            ? this.player.player_card_id
            : card.id
        positionObject.ready = ready

        if (position.startsWith('center')) {
          centerCards.push(positionObject)
        } else {
          playerCards.push(positionObject)
        }
      }
    })

    this.centerCards = centerCards
    this.playerCards = playerCards
  }

  getGamePlayBoardCards(): void {
    const gamePlayBoardCards: GamePlayBoardCardType[] = []
    const playerCards: PositionProperties[] = []
    const centerCards: PositionProperties[] = []

    this.centerCards.forEach((centerCard) => {
      const card: GamePlayBoardCardType = {
        position: centerCard.position,
        card: {
          id: centerCard.id === null ? null : 0,
          artifact: false,
          shield: false,
          selectable: false,
        },
      }
      gamePlayBoardCards.push(card)
    })

    this.playerCards.forEach((playerCard) => {
      const card: GamePlayBoardCardType = {
        position: playerCard.position,
        card: {
          id: 0,
          artifact: false,
          shield: false,
          selectable: false,
        },
      }
      gamePlayBoardCards.push(card)
    })

    gamePlayBoardCards.forEach((gamePlayBoardCard) => {
      const { position, card } = gamePlayBoardCard
      const positionKey = position as PositionKeys
      if (this[positionKey]) {
        const positionObject = this[positionKey] as PositionProperties
        positionObject.id = card.id

        if (position.startsWith('center')) {
          centerCards.push(positionObject)
        } else {
          playerCards.push(positionObject)
        }
      }
    })

    this.centerCards = centerCards
    this.playerCards = playerCards
    this.gamePlayBoardCards = gamePlayBoardCards
  }
}

export default GameBoardStore
export const gameBoardStore = new GameBoardStore()
