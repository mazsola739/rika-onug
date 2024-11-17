import { computed, makeAutoObservable } from 'mobx'
import { CardJson, Player, TokenJson } from 'types'
import { createDefaultPlayer, getArtifactById, getCardById, getMarkByName } from 'utils'

class PlayersStore {
  player: Player = createDefaultPlayer()
  players: Player[] = []

  constructor() {
    makeAutoObservable(this, {
      isPlayerReady: computed
    })
  }

  setPlayer(player: Player): void {
    this.player = player
  }

  setPlayers(players: Player[]): void {
    this.players = players
  }

  get knownPlayerCard(): CardJson {
    return getCardById(this.player.player_card_id)
  }
  get knownPlayerMark(): TokenJson {
    return getMarkByName(this.player.player_mark)
  }
  get knownPlayerArtifact(): TokenJson {
    return getArtifactById(this.player.player_artifact)
  }

  get isPlayerReady(): boolean {
    const currentPlayer = this.players.find(actualPlayer => actualPlayer.player_number === this.player.player_number)

    return currentPlayer ? currentPlayer.flag : false
  }
}

export default PlayersStore
export const playersStore = new PlayersStore()
