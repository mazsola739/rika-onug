import { makeAutoObservable } from 'mobx'
import { Interaction, Result } from 'types'

class PropStore {
  title: string
  nightfall: boolean
  sunrise: boolean
  interaction: Interaction
  end: boolean = false
  voteResult: Result[] = []
  winnerTeams: string[] = []
  loserTeams: string[] = []

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
  get vampires() {
    return this.interaction.vampires
  }
  get aliens() {
    return this.interaction.aliens
  }
  get groobzerb() {
    return this.interaction.groobzerb
  }
  get villains() {
    return this.interaction.villains
  }
  get tanner() {
    return this.interaction.tanner
  }
  get assassins() {
    return this.interaction.assassins
  }
  get madscientist() {
    return this.interaction.madscientist
  }
  get seers() {
    return this.interaction.seers
  }
  get lovers() {
    return this.interaction.lovers
  }
  get part_of_blob() {
    return this.interaction.part_of_blob
  }
  get part_of_family() {
    return this.interaction.part_of_family
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

  setVoteResult(voteResult: Result[]): void {
    this.voteResult = voteResult
  }

  setWinnerTeams(winnerTeams: string[]): void {
    this.winnerTeams = winnerTeams
  }

  setLoserTeams(loserTeams: string[]): void {
    this.loserTeams = loserTeams
  }

  emptyValues(): void {
    this.title = ''
    this.interaction = {
      aliens: [],
      assassins: [],
      answer_options: [],
      artifacted_cards: [],
      dreamwolf: [],
      groobzerb: [],
      scene_end: false,
      obligatory: false,
      madscientist: [],
      masons: [],
      new_role_id: 0,
      selectable_card_limit: { player: 0, center: 0 },
      selectable_cards: [],
      selectable_mark_limit: { mark: 0 },
      selectable_marks: [],
      shielded_cards: [],
      show_cards: [],
      show_marks: [],
      vampires: [],
      villains: [],
      tanner: [],
      seers: [],
      lovers: [],
      part_of_blob: [],
      part_of_family: [],
      werewolves: []
    }
    this.voteResult = []
    this.winnerTeams = []
  }
}

export default PropStore
export const propStore = new PropStore()
