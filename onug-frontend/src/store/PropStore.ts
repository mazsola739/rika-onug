import { makeAutoObservable } from 'mobx'
import { InteractionType, ResultType, VoteType } from 'types'

class PropStore {
  title: string
  action: InteractionType

  vampireVotes: VoteType = {}
  alienVotes: VoteType = {}
  empathVotes: VoteType = {}

  nightfall: boolean
  sunrise: boolean
  end: boolean = false

  voteResult: ResultType[] = []
  winnerTeams: string[] = []
  loserTeams: string[] = []

  constructor() {
    makeAutoObservable(this)
  }

  get aliens() {
    return this.action.aliens
  }
  get answer_options() {
    return this.action.answer_options
  }
  get apprenticeassassins() {
    return this.action.apprenticeassassins
  }
  get artifacted_cards() {
    return this.action.artifacted_cards
  }
  get assassins() {
    return this.action.assassins
  }
  get cow() {
    return this.action.cow
  }
  get current() {
    return this.action.current
  }
  get dreamwolf() {
    return this.action.dreamwolf
  }
  get evilometer() {
    return this.action.evilometer
  }
  get groobzerb() {
    return this.action.groobzerb
  }
  get lovers() {
    return this.action.lovers
  }
  get madscientist() {
    return this.action.madscientist
  }
  get masons() {
    return this.action.masons
  }
  get obligatory() {
    return this.action.obligatory
  }
  get part_of_blob() {
    return this.action.part_of_blob
  }
  get part_of_family() {
    return this.action.part_of_family
  }
  get scene_end() {
    return this.action.scene_end
  }
  get seers() {
    return this.action.seers
  }
  get selectable_cards() {
    return this.action.selectable_cards
  }
  get selectable_card_limit() {
    return this.action.selectable_card_limit
  }
  get selectable_marks() {
    return this.action.selectable_marks
  }
  get selectable_mark_limit() {
    return this.action.selectable_mark_limit
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
  get tanner() {
    return this.action.tanner
  }
  get vampires() {
    return this.action.vampires
  }
  get villains() {
    return this.action.villains
  }
  get werewolves() {
    return this.action.werewolves
  }
  get witness() {
    return this.action.witness
  }
  get isVote() {
    return this.action.vote
  }

  setInteraction(action: InteractionType): void {
    this.action = { ...this.action, ...action }
  }
  setTitle(title: string): void {
    this.title = title
  }

  setVampireVotes(vampireVotes: VoteType): void {
    this.vampireVotes = vampireVotes
  }
  setAlienVotes(alienVotes: VoteType): void {
    this.alienVotes = alienVotes
  }
  setEmpathVotes(empathVotes: VoteType): void {
    this.empathVotes = empathVotes
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

  setVoteResult(voteResult: ResultType[]): void {
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
      cow: [],
      current: [],
      dreamwolf: [],
      groobzerb: [],
      evilometer: [],
      scene_end: false,
      obligatory: false,
      madscientist: [],
      masons: [],
      new_role_id: 0,
      part_of_blob: [],
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
      part_of_family: [],
      vote: false,
      werewolves: [],
      witness: []
    }

    this.vampireVotes = {}
    this.alienVotes = {} 
    this.empathVotes = {}

    this.voteResult = []
    this.winnerTeams = []
    this.loserTeams = []
  }
}
export const propStore = new PropStore()
