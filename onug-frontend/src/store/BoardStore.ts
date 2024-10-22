import { makeAutoObservable } from 'mobx'
import { PlayerType, PlayersType } from 'types'

class BoardStore {
  player: PlayerType
  knownPlayer: PlayerType
  players: PlayersType[]

  constructor() {
    makeAutoObservable(this)

    this.setPlayer = this.setPlayer.bind(this)
    this.setKnownPlayer = this.setKnownPlayer.bind(this)
    this.setPlayers = this.setPlayers.bind(this)
  }

  setKnownPlayer(knownPlayer: PlayerType): void {
    this.knownPlayer = knownPlayer
  }

  setPlayer(player: PlayerType): void {
    this.player = player
  }

  setPlayers(players: PlayersType[]): void {
    this.players = players
    this.knownPlayer = { ...this.player }
  }

/*   closeYourEyes(): void {
    interactionStore.resetInteraction()

    const gamePlayBoardCards: GamePlayBoardCardType[] = []
    const playerCards: PlayerPositionProperties[] = []
    const centerCards: CenterPositionProperties[] = []
    const answerOptions: string[] = []

    this.centerCards.forEach((centerCard) => {
      const card: GamePlayBoardCardType = {
        position: centerCard.position,
        card: {
          id: centerCard.id === null ? null : 0,
          cardId: centerCard.id === null ? null : 0,
          mark: '',
          selectable_cards: false,
          selectable_marks: false,
        },
      }
      gamePlayBoardCards.push(card)
      centerCards.push({ ...centerCard, ...card.card })
    })

    this.playerCards.forEach((playerCard) => {
      const card: GamePlayBoardCardType = {
        position: playerCard.position,
        card: {
          id: 0,
          cardId: 0,
          mark: '',
          selectable_cards: false,
          selectable_marks: false,
          shield: false,
          artifact: false,
        },
      }
      gamePlayBoardCards.push(card)
      playerCards.push({ ...playerCard, ...card.card })
    })

    this.answerOptions = answerOptions

    this.centerCards = centerCards
    this.playerCards = playerCards
    this.gamePlayBoardCards = gamePlayBoardCards
  } */
}

export default BoardStore
export const boardStore = new BoardStore()
