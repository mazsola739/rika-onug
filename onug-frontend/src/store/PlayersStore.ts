import { computed, makeAutoObservable } from 'mobx'
import { CardJson, PlayerType, TokenJson } from 'types'
import { createDefaultPlayer, getArtifactById, getCardById, getMarkByName } from 'utils'

class PlayersStore {
  player: PlayerType = createDefaultPlayer()
  players: PlayerType[] = []

  constructor() {
    makeAutoObservable(this, {
      isPlayerReady: computed
    })
  }

  setPlayer(player: PlayerType): void {
    this.player = player
  }

  setPlayers(players: PlayerType[]): void {
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
