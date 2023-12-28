import DeckStore from 'store/DeckStore'

export interface HomeProps {
  deckStore: DeckStore
}

export interface SelectedCardProps {
  src: string
  alt: string
  id: number
}
