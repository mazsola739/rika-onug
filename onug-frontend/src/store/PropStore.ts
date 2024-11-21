import { makeAutoObservable } from 'mobx'
import { CardPosition, Interaction, Result, VoteType } from 'types'

class PropStore {
  title: string
  nightfall: boolean
  sunrise: boolean
  action: Interaction
  end: boolean = false
  voteResult: Result[] = []
  winnerTeams: string[] = []
  loserTeams: string[] = []
  vampireVotes: VoteType = {}

  constructor() {
    makeAutoObservable(this)
  }

  get answer_options() {
    return this.action.answer_options
  }
  get artifacted_cards() {
    return this.action.artifacted_cards
  }
  get dreamwolf() {
    return this.action.dreamwolf
  }
  get scene_end() {
    return this.action.scene_end
  }
  get obligatory() {
    return this.action.obligatory
  }
  get selectable_card_limit() {
    return this.action.selectable_card_limit
  }
  get selectable_cards() {
    return this.action.selectable_cards
  }
  get selectable_mark_limit() {
    return this.action.selectable_mark_limit
  }
  get selectable_marks() {
    return this.action.selectable_marks
  }
  get shielded_cards() {
    return this.action.shielded_cards
  }
  get show_cards() {
    return this.action.show_cards
  }
  get show_marks() {
    return this.action.show_marks
  }
  get werewolves() {
    return this.action.werewolves
  }
  get masons() {
    return this.action.masons
  }
  get vampires() {
    return this.action.vampires
  }
  get aliens() {
    return this.action.aliens
  }
  get groobzerb() {
    return this.action.groobzerb
  }
  get villains() {
    return this.action.villains
  }
  get tanner() {
    return this.action.tanner
  }
  get assassins() {
    return this.action.assassins
  }
  get apprenticeassassins() {
    return this.action.apprenticeassassins
  }
  get madscientist() {
    return this.action.madscientist
  }
  get seers() {
    return this.action.seers
  }
  get lovers() {
    return this.action.lovers
  }
  get part_of_blob() {
    return this.action.part_of_blob
  }
  get part_of_family() {
    return this.action.part_of_family
  }
  get isVote() {
    return this.action.vote
  }

  setInteraction(action: Interaction): void {
    this.action = { ...this.action, ...action }
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

  setVampireVotes(vampireVotes: VoteType): void {
    this.vampireVotes = vampireVotes
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
    this.action = {
      aliens: [],
      apprenticeassassins: [],
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
      werewolves: [],
      vote: false
    }
    this.voteResult = []
    this.winnerTeams = []
    this.vampireVotes = {}
  }
}

export default PropStore
export const propStore = new PropStore()
