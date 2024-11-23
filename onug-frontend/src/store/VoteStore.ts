import { UPDATE_GUESS } from 'constant'
import * as narration_text from 'constant/narrations'
import { script } from 'data'
import { makeAutoObservable } from 'mobx'
import { CardPositionType, GuessedCardType, GuessTokenType, NarrationType, PlayerType, WsJsonMessageType } from 'types'
import { getCardById } from 'utils'
import { propStore } from './PropStore'
import { riseAndRestStore } from './RiseAndRestStore'
import { wsStore } from './WsStore'

class VoteStore {
  narrations: Record<string, NarrationType[]>[]
  isGuessing: boolean = false
  guessedCards: GuessedCardType[] = []
  guessCards: number[] = []

  //selection
  guessedId: number | null = null
  guessedCardPosition: CardPositionType | '' = ''

  resultPlayers: PlayerType[] = []

  constructor() {
    makeAutoObservable(this)
  }

  setNarrations(narrations: Record<string, NarrationType[]>[]): void {
    this.narrations = narrations
  }

  setIsGuessing(value: boolean): void {
    this.isGuessing = value
  }

  setGuessedCards(guessedCards: GuessedCardType[]): void {
    this.guessedCards = guessedCards
  }

  setGuessCards(guessCards: number[]): void {
    this.guessCards = guessCards
  }

  selectGuessId(id: number) {
    this.guessedId = id
    this.checkAndSendGuess()
  }

  selectGuessCardPosition(position: CardPositionType) {
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

  getGuessTokensByPosition(position: CardPositionType): GuessTokenType[] {
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

  revealResult(lastJsonMessage: WsJsonMessageType): void {
    this.resetGuesses()
    this.resultPlayers = lastJsonMessage.players
    propStore.setVoteResult(lastJsonMessage.vote_result)
    propStore.setWinnerTeams(lastJsonMessage.winner_teams)
    propStore.setLoserTeams(lastJsonMessage.loser_teams)
    riseAndRestStore.setTableCenterCards(lastJsonMessage)
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
