import * as narration_text from 'constant/narrations'
import { script } from 'data'
import { computed, makeAutoObservable } from 'mobx'
import { CardJson, CardPosition, NarrationType, Player, TokenJson } from 'types'
import { createDefaultPlayer, getCardById, getMarkByName } from 'utils'
import { deckStore } from './DeckStore'
import { playersStore } from './PlayersStore'
import { wsStore } from './WsStore'
import { UPDATE_GUESS } from 'constant'

class VoteStore {
  knownPlayer: Player = createDefaultPlayer()
  narrations: Record<string, NarrationType[]>[]
  isGuessing: boolean = false
  guessedId: number | null = null
  guessedCardPosition: CardPosition | '' = ''

  constructor() {
    makeAutoObservable(this, {
      isPlayerReady: computed
    })
  }

  setKnownPlayer(player: Player): void {
    this.knownPlayer = player
  }

  setNarrations(narrations: Record<string, NarrationType[]>[]): void {
    this.narrations = narrations
  }

  setIsGuessing(value: boolean): void {
    this.isGuessing = value
  }

  selectGuessId(id: number) {
    this.guessedId = id
    this.checkAndSendGuess()
  }

  selectGuessCardPosition(position: CardPosition) {
    this.guessedCardPosition = position
    this.checkAndSendGuess()
  }

  checkAndSendGuess() {
    const room_id = sessionStorage.getItem('room_id')
    const token = sessionStorage.getItem('token')

    if (this.guessedId !== null && this.guessedCardPosition !== null) {
      wsStore.sendJsonMessage({
        type: UPDATE_GUESS,
        guess: {
          position: this.guessedCardPosition,
          id: this.guessedId,
        },
        room_id,
        token,
      })

      this.guessedId = null
      this.guessedCardPosition = null
    }
  }

  get guessTokens(): { image: string; expansion: string, id: number }[] {
    const cards = deckStore.selectedCards
    return cards.map(card => ({
      image: card.card_name,
      expansion: card.expansion,
      id: card.id,
    }))
  }

  get knownPlayerCard(): CardJson { return getCardById(this.knownPlayer.player_card_id) }
  get knownPlayerMark(): TokenJson { return getMarkByName(this.knownPlayer.player_mark) }
  get isPlayerReady(): boolean {
    const currentPlayer = playersStore.players.find(
      actualPlayer => actualPlayer.player_number === this.knownPlayer.player_number
    )

    return currentPlayer ? currentPlayer.flag : false
  }

  get voteNarration(): { image: string, text: string }[] {
    const voteNarration = this.narrations.map(narration => {
      const title = Object.keys(narration)[0]
      const narrationKeys = Object.values(narration)[0] as string[]
      const image = script.find(s => s.scene_title === title)?.scene_img
      const narrationTextDict = narration_text as { [key: string]: string }
      const text = narrationKeys.map(key => narrationTextDict[key]).join(' ')

      return { image, text }
    })

    return voteNarration
  }
}

export default VoteStore
export const voteStore = new VoteStore()
