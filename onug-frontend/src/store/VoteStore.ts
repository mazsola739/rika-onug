import * as narration_text from 'constant/narrations'
import { script } from 'data'
import { computed, makeAutoObservable } from 'mobx'
import { CardJson, CardPosition, NarrationType, Player, TokenJson } from 'types'
import { createDefaultPlayer, getCardById, getMarkByName } from 'utils'
import { playersStore } from './PlayersStore'

class VoteStore {
  knownPlayer: Player = createDefaultPlayer()
  narrations: Record<string, NarrationType[]>[]
  votablePlayers: CardPosition[]

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

  setVotablePlayers(votablePlayers: CardPosition[]): void {
    this.votablePlayers = votablePlayers
  }

  get knownPlayerCard(): CardJson { return getCardById(this.knownPlayer.player_card_id) }
  get knownPlayerMark(): TokenJson { return getMarkByName(this.knownPlayer.player_mark) }
  get isPlayerReady(): boolean {
    const currentPlayer = playersStore.players.find(
      actualPlayer => actualPlayer.player_number === this.knownPlayer.player_number
    )

    return currentPlayer ? currentPlayer.ready : false
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
