import { makeAutoObservable } from 'mobx';
import { CardPosition, InteractionType } from 'types';

class GamePropStore {
  interaction: InteractionType = {
    answer_options: [],
    artifacted_cards: [],
    new_role_id: 0,
    selectable_card_limit: { player: 0, center: 0 },
    selectable_cards: [],
    selectable_mark_limit: { mark: 0 },
    shielded_cards: [],
    show_cards: [],
    show_marks: []
  }

  answer_options: string[] = []
  artifacted_cards: string[] = []
  selectable_card_limit: { player: number; center: number } = { player: 0, center: 0 }
  selectable_cards: string[] = []
  selectable_mark_limit: { mark: number } = { mark: 0 }
  shielded_cards: string[] = []
  show_cards: Record<CardPosition, number>[] = []
  show_marks: Record<CardPosition, string>[] = []


  constructor() {
    makeAutoObservable(this)
  }

  setInteraction(interaction: InteractionType): void {
    this.interaction = interaction

    if (interaction?.answer_options) {
      this.setAnswerOptions(interaction.answer_options)
    }
    if (interaction?.artifacted_cards) {
      this.setArtifactedCards(interaction.artifacted_cards)
    }
    if (interaction?.selectable_card_limit) {
      this.setSelectableCardLimit(interaction.selectable_card_limit)
    }
    if (interaction?.selectable_cards) {
      this.setSelectableCards(interaction.selectable_cards)
    }
    if (interaction?.selectable_mark_limit) {
      this.setSelectableMarkLimit(interaction.selectable_mark_limit)
    }
    if (interaction?.shielded_cards) {
      this.setShieldedCards(interaction.shielded_cards)
    }
    if (interaction?.show_cards) {
      this.setShowCards(interaction.show_cards)
    }
    if (interaction?.show_marks) {
      this.setShowMarks(interaction.show_marks)
    }
  }

  setAnswerOptions(answer_options: string[]): void {
    this.answer_options = answer_options
  }

  setArtifactedCards(artifacted_cards: string[]): void {
    this.artifacted_cards = artifacted_cards
  }

  setSelectableCardLimit(selectable_card_limit: { player: number; center: number }): void {
    this.selectable_card_limit = selectable_card_limit
  }

  setSelectableCards(selectable_cards: string[]): void {
    this.selectable_cards = selectable_cards
  }

  setSelectableMarkLimit(selectable_mark_limit: { mark: number }): void {
    this.selectable_mark_limit = selectable_mark_limit
  }

  setShieldedCards(shielded_cards: string[]): void {
    this.shielded_cards = shielded_cards
  }

  setShowCards(show_cards: Record<CardPosition, number>[]): void {
    this.show_cards = show_cards
  }

  setShowMarks(show_marks: Record<CardPosition, string>[]): void {
    this.show_marks = show_marks
  }

  reset(): void {
    this.interaction = {
      answer_options: [],
      artifacted_cards: [],
      new_role_id: 0,
      selectable_card_limit: { player: 0, center: 0 },
      selectable_cards: [],
      selectable_mark_limit: { mark: 0 },
      shielded_cards: [],
      show_cards: [],
      show_marks: []
    };

    this.answer_options = [];
    this.artifacted_cards = [];
    this.selectable_card_limit = { player: 0, center: 0 };
    this.selectable_cards = [];
    this.selectable_mark_limit = { mark: 0 };
    this.shielded_cards = [];
    this.show_cards = [];
    this.show_marks = [];
  }
}

export default GamePropStore
export const gamePropStore = new GamePropStore()
