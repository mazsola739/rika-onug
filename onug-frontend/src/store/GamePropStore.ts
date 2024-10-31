import { makeAutoObservable } from 'mobx'
import { InteractionType } from 'types'

class GamePropStore {
  interaction: InteractionType = {
    answer_options: [],
    artifacted_cards: [],
    dreamwolf: [],
    new_role_id: 0,
    obligatory: false,
    selectable_card_limit: { player: 0, center: 0 },
    selectable_cards: [],
    selectable_mark_limit: { mark: 0 },
    selectable_marks: [],
    shielded_cards: [],
    show_cards: [],
    show_marks: [],
    werewolf: []
  }

  constructor() {
    makeAutoObservable(this)
  }

  get answer_options() { return this.interaction.answer_options }
  get artifacted_cards() { return this.interaction.artifacted_cards }
  get dreamwolf() { return this.interaction.dreamwolf }
  get obligatory() { return this.interaction.obligatory }
  get selectable_card_limit() { return this.interaction.selectable_card_limit }
  get selectable_cards() { return this.interaction.selectable_cards }
  get selectable_mark_limit() { return this.interaction.selectable_mark_limit }
  get selectable_marks() { return this.interaction.selectable_marks }
  get shielded_cards() { return this.interaction.shielded_cards }
  get show_cards() { return this.interaction.show_cards }
  get show_marks() { return this.interaction.show_marks }
  get werewolf() { return this.interaction.werewolf }

  setInteraction(interaction: InteractionType): void {
    this.interaction = { ...this.interaction, ...interaction }
  }

  reset(): void {
    this.interaction = {
      answer_options: [],
      artifacted_cards: [],
      dreamwolf: [],
      obligatory: false,
      new_role_id: 0,
      selectable_card_limit: { player: 0, center: 0 },
      selectable_cards: [],
      selectable_mark_limit: { mark: 0 },
      selectable_marks: [],
      shielded_cards: [],
      show_cards: [],
      show_marks: [],
      werewolf: []
    }
  }
}

export default GamePropStore
export const gamePropStore = new GamePropStore()
