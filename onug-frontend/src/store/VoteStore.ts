import { computed, makeAutoObservable } from 'mobx'
import { CardJson, Player, TokenJson } from 'types'
import { createDefaultCard, createDefaultPlayer, createDefaultToken, getCardById, getMarkByName } from 'utils'
import { playersStore } from './PlayersStore'
import { deckStore } from './DeckStore'

class VoteStore {
  knownPlayer: Player = createDefaultPlayer()
  knownPlayerCard: CardJson = createDefaultCard()
  knownPlayerMark: TokenJson = createDefaultToken()

  constructor() {
    makeAutoObservable(this, {
      isPlayerReady: computed
    })
  }

  setKnownPlayer(player: Player): void {
    this.knownPlayer = player
  }

  setKnownPlayerCard(): void {
    const card = getCardById(this.knownPlayer.player_card_id)
    this.knownPlayerCard = card
  }

  setKnownPlayerMark(): void {
    const mark = getMarkByName(this.knownPlayer.player_mark)
    this.knownPlayerMark = mark
  }

  get isPlayerReady(): boolean {
    const currentPlayer = playersStore.players.find(
      actualPlayer => actualPlayer.player_number === this.knownPlayer.player_number
    )
    
    return currentPlayer ? currentPlayer.ready : false
  }
}

export default VoteStore
export const voteStore = new VoteStore()
