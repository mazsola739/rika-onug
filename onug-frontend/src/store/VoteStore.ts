import { UPDATE_GUESS } from 'constant'
import * as narration_text from 'constant/narrations'
import { script } from 'data'
import { computed, makeAutoObservable } from 'mobx'
import { CardJson, CardPosition, GuessedCard, GuessToken, NarrationType, Player, TokenJson, WsJsonMessage } from 'types'
import { createDefaultPlayer, getArtifactById, getCardById, getMarkByName } from 'utils'
import { playersStore } from './PlayersStore'
import { wsStore } from './WsStore'

class VoteStore {
  knownPlayer: Player = createDefaultPlayer()
  narrations: Record<string, NarrationType[]>[]
  isGuessing: boolean = false
  guessedCards: GuessedCard[] = []
  guessCards: number[] = []
  //selection
  guessedId: number | null = null
  guessedCardPosition: CardPosition | '' = ''

  resultPlayers: Player[] = []

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

  setGuessedCards(guessedCards: GuessedCard[]): void {
    this.guessedCards = guessedCards
  }

  setGuessCards(guessCards: number[]): void {
    this.guessCards = guessCards
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

    if (this.guessedId !== null && this.guessedCardPosition !== null && this.guessedCardPosition !== '') {
      wsStore.sendJsonMessage({
        type: UPDATE_GUESS,
        guess: {
          position: this.guessedCardPosition,
          id: this.guessedId
        },
        room_id,
        token
      })

      this.guessedId = null
      this.guessedCardPosition = null
    }
  }

  get guessTokens(): { image: string; expansion: string; id: number }[] {
    const cards = this.guessCards
    const tokens = cards
      .map(card => getCardById(card))
      .map(card => ({
        image: card.card_name,
        expansion: card.expansion,
        id: card.id
      }))

    return tokens
  }

  get knownPlayerCard(): CardJson {
    return getCardById(this.knownPlayer.player_card_id)
  }
  get knownPlayerMark(): TokenJson {
    return getMarkByName(this.knownPlayer.player_mark)
  }
  get knownPlayerArtifact(): TokenJson {
    return getArtifactById(this.knownPlayer.player_artifact)
  }
  get isPlayerReady(): boolean {
    const currentPlayer = playersStore.players.find(actualPlayer => actualPlayer.player_number === this.knownPlayer.player_number)

    return currentPlayer ? currentPlayer.flag : false
  }

  get voteNarration(): { image: string; text: string }[] {
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

  getGuessTokensByPosition(position: CardPosition): GuessToken[] {
    const guessedCard = this.guessedCards.find(card => card.position === position)

    if (!guessedCard) return []

    return guessedCard.guessed_roles.map(id => {
      const card = getCardById(id)
      return {
        image: card.card_name,
        expansion: card.expansion,
        id: card.id
      }
    })
  }

  revealResult(lastJsonMessage: WsJsonMessage): void {
    this.resultPlayers = lastJsonMessage.players
  }

  resetGuesses(): void {
    this.guessedCards = []
    this.guessCards = []
    this.guessedId = null
    this.guessedCardPosition = ''
    this.isGuessing = false
  }
}

export default VoteStore
export const voteStore = new VoteStore()
