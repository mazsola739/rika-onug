import { makeAutoObservable } from 'mobx'
import { Interaction, Result } from 'types'

class GamePropStore {
  title: string
  nightfall: boolean
  sunrise: boolean
  interaction: Interaction
  end: boolean = false
  voteResult: Result[]
  winnerTeams: string[]

  constructor() {
    makeAutoObservable(this)
  }

  get answer_options() {
    return this.interaction.answer_options
  }
  get artifacted_cards() {
    return this.interaction.artifacted_cards
  }
  get dreamwolf() {
    return this.interaction.dreamwolf
  }
  get scene_end() {
    return this.interaction.scene_end
  }
  get obligatory() {
    return this.interaction.obligatory
  }
  get selectable_card_limit() {
    return this.interaction.selectable_card_limit
  }
  get selectable_cards() {
    return this.interaction.selectable_cards
  }
  get selectable_mark_limit() {
    return this.interaction.selectable_mark_limit
  }
  get selectable_marks() {
    return this.interaction.selectable_marks
  }
  get shielded_cards() {
    return this.interaction.shielded_cards
  }
  get show_cards() {
    return this.interaction.show_cards
  }
  get show_marks() {
    return this.interaction.show_marks
  }
  get werewolves() {
    return this.interaction.werewolves
  }
  get masons() {
    return this.interaction.masons
  }

  setInteraction(interaction: Interaction): void {
    this.interaction = { ...this.interaction, ...interaction }
  }

  setTitle(title: string): void {
    this.title = title
  }

  setNightfall(nightfall: boolean): void {
    this.nightfall = nightfall
    this.sunrise = !nightfall
  }

  setSunrise(sunrise: boolean): void {
    this.sunrise = sunrise
    this.nightfall = !sunrise
  }

  setEnd(end: boolean): void {
    this.end = end
  }

  setVoteResult(voteResult: Result[]) : void {
    this.voteResult = voteResult
  }
  setWinnerTeams(winnerTeams: string[]): void {
    this.winnerTeams = winnerTeams
  }

  reset(): void {
    this.title = ''
    this.interaction = {
      answer_options: [],
      artifacted_cards: [],
      dreamwolf: [],
      scene_end: false,
      obligatory: false,
      masons: [],
      new_role_id: 0,
      selectable_card_limit: { player: 0, center: 0 },
      selectable_cards: [],
      selectable_mark_limit: { mark: 0 },
      selectable_marks: [],
      shielded_cards: [],
      show_cards: [],
      show_marks: [],
      werewolves: []
    }
  }
}

export default GamePropStore
export const gamePropStore = new GamePropStore()
