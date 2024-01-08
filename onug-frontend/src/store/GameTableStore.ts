import { makeAutoObservable } from 'mobx'
import { CardType, CenterCardType, PlayerType } from 'types'
import { selectedDeckStore } from 'store'
import {
  hasMarkIds,
  identifier_player,
  supervillainIdsToCheck,
  wolfIdsToCheck,
} from 'constant'
import { utils, gameTableStoreUtils } from 'utils'

const { checkCardPresence, filterCardsByIds } = gameTableStoreUtils
const { areAnyCardSelectedById, getRandomItemFromArray, shuffleCardsArray } =
  utils

export class GameTableStore {
  players: PlayerType[] = []
  centerCards: CenterCardType

  constructor() {
    makeAutoObservable(this)
  }

  get totalPlayers(): number {
    return selectedDeckStore.totalPlayers
  }

  get selectedCards(): CardType[] {
    return selectedDeckStore.selectedCards
  }

  get hasDoppelganger(): boolean {
    return checkCardPresence(this.selectedCards, 1)
  }

  get hasAlphaWolf(): boolean {
    return checkCardPresence(this.selectedCards, 17)
  }

  get hasCurator(): boolean {
    return checkCardPresence(this.selectedCards, 20)
  }

  get hasSentinel(): boolean {
    return checkCardPresence(this.selectedCards, 25)
  }

  get hasTemptress(): boolean {
    return checkCardPresence(this.selectedCards, 69)
  }

  get hasMarks(): boolean {
    return areAnyCardSelectedById(this.selectedCards, hasMarkIds)
  }

  distributeCards(): {
    centerCards: CardType[]
    playerCards: CardType[]
    chosenWolf?: CardType
    chosenSuperVillain?: CardType
  } {
    let cards = [...this.selectedCards]

    const chosenWolf = this.hasAlphaWolf
      ? getRandomItemFromArray(filterCardsByIds(cards, wolfIdsToCheck))
      : undefined

    const chosenSupervillain = this.hasTemptress
      ? getRandomItemFromArray(filterCardsByIds(cards, supervillainIdsToCheck))
      : undefined

    if (chosenWolf) cards = cards.filter((card) => card !== chosenWolf)
    if (chosenSupervillain)
      cards = cards.filter((card) => card !== chosenSupervillain)

    const shuffledCards = shuffleCardsArray(cards)

    const centerCards = shuffledCards.slice(0, 3)
    const playerCards = shuffledCards.slice(3)

    return {
      centerCards,
      playerCards,
      chosenWolf,
      chosenSuperVillain: chosenSupervillain,
    }
  }

  createPlayers(): void {
    this.players = []

    const { playerCards } = this.distributeCards()

    for (let i = 0; i < this.totalPlayers; i++) {
      const card = playerCards[i]
      const key = `identifier_player${i + 1}_text`
      const player: PlayerType = {
        player_name: identifier_player[key],
        player_number: i + 1,
        player_card: {
          card_name: card.card_name,
          display_name: card.display_name,
          team: card.team,
          artifact: '',
          shield: false,
          mark: this.hasMarks ? 'mark_of_clarity' : '',
          rules: card.rules,
        },
        gameplay_changes: [],
        end_of_game: {
          received_votes: [],
          given_votes: [],
        },
      }

      this.players.push(player)

      this.players.forEach((player) => {
        const changes = {
          new_card_name: player.player_card.card_name,
          new_team: player.player_card.team,
          new_artifact: player.player_card.artifact,
          new_shield: player.player_card.shield,
          new_mark: player.player_card.mark,
        }
        player.gameplay_changes.push(changes)
      })
    }
  }

  storeCenterCards(): void {
    const { centerCards, chosenWolf, chosenSuperVillain } =
      this.distributeCards()

    this.centerCards = {
      wolf_card: chosenWolf ? { ...chosenWolf } : null,
      center_cards: {
        left: centerCards[0],
        middle: centerCards[1],
        right: centerCards[2],
      },
      villain_card: chosenSuperVillain ? { ...chosenSuperVillain } : null,
    }
  }
}

export default GameTableStore
export const gameTableStore = new GameTableStore()
